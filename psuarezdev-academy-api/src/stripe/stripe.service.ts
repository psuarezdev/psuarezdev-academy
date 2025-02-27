import Stripe from 'stripe';
import dotenv from 'dotenv';
import { UserService } from '@/user/user.service';
import { UserDTO } from '@/user/dto/user.dto';
import { CustomApiError } from '@/lib/errors';

dotenv.config();

export interface ProductDetail {
  name: string;
  description: string | null;
  metadata: Stripe.Metadata;
}

export class StripeService {
  constructor(private readonly userService: UserService) { }

  stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

  async getSubscriptions() {
    try {
      const prices = (await this.stripe.prices.list()).data;

      const pricesWithDetails = await Promise.all(
        prices.map(async (price) => {
          const productDetails = await this.getProductDetails(price.product);
          if (!productDetails) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
            throw new Error(`No se ha podido obtener la información del producto con id ${price.product}`);
          }

          return { ...price, productDetails };
        })
      );

      return pricesWithDetails;
    } catch {
      return null;
    }
  }

  async getProductDetails(product: string | Stripe.Product | Stripe.DeletedProduct) {
    let productDetails;

    if (typeof product === 'string') {
      productDetails = await this.stripe.products.retrieve(product);
    } else if ('name' in product) {
      productDetails = product;
    } else {
      return null;
    }

    return {
      name: productDetails.name,
      description: productDetails.description,
      metadata: productDetails.metadata
    };
  }

  async getCustomer(id: string) {
    try {
      return await this.stripe.customers.retrieve(id);
    } catch {
      return null;
    }
  }

  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

      return {
        ...subscription,
        productDetails: await this.getProductDetails(subscription.items.data[0].price.product)
      };
    } catch {
      return null;
    }
  }

  async updateSuscription(user: UserDTO) {
    try {
      if (!user.subscriptionId) return null;

      const subscription = await this.getSubscription(user.subscriptionId);

      if (!subscription) return null;

      await this.stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: !subscription.cancel_at_period_end
      });

      return !subscription.cancel_at_period_end;
    } catch {
      return null;
    }
  }

  async checkout(priceId: string, user: UserDTO) {
    try {
      return await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        success_url: `${process.env.BASE_URL}/checkout-success`,
        cancel_url: `${process.env.BASE_URL}/pricing`,
        customer_email: user.email,
        metadata: { userId: user.id },
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ]
      });
    } catch {
      return null;
    }
  }

  async webhooks(body: any, signature: string) {
    let event: Stripe.Event | null = null;
    let customerFound: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> | null = null;

    event = this.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET ?? '');

    switch (event.type) {
      case 'customer.subscription.created':
        customerFound = await this.getCustomer(event.data.object.customer as string);

        if (!customerFound || !('email' in customerFound) || !customerFound.email) {
          throw new CustomApiError(400, 'El usuario a ha sido eliminado o no tiene el email asignado');
        }

        await this.userService.updateSubscription(
          customerFound.email,
          event.data.object.id
        );
        break;
      case 'customer.subscription.updated':
        customerFound = await this.getCustomer(event.data.object.customer as string);

        if (!customerFound || !('email' in customerFound) || !customerFound.email) {
          throw new CustomApiError(400, 'El usuario a ha sido eliminado o no tiene el email asignado');
        }

        await this.userService.updateSubscription(
          customerFound.email,
          event.data.object.status === 'active' ? event.data.object.id : null
        );
        break;
      case 'customer.subscription.deleted':
        customerFound = await this.getCustomer(event.data.object.customer as string);

        if (!customerFound || !('email' in customerFound) || !customerFound.email) {
          throw new CustomApiError(400, 'El usuario a ha sido eliminado o no tiene el email asignado');
        }

        await this.userService.updateSubscription(customerFound.email, null);
        break;
    }
  }
}
