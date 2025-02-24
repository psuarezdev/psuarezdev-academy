import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getSubscriptions = async () => {
  try {
    const prices = (await stripe.prices.list()).data;

    const pricesWithDetails = await Promise.all(
      prices.map(async (price) => {
        const productDetails = await getProductDetails(price.product);
        if (!productDetails) {
          throw new Error(`No se ha podido obtener la información del producto con id ${price.product}`);
        }

        return {
          ...price,
          productDetails,
        };
      })
    );

    return pricesWithDetails;
  } catch {
    return null;
  }
};

export const getProductDetails = async (product: string | Stripe.Product | Stripe.DeletedProduct) => {
  let productDetails;

  if (typeof product === 'string') {
    productDetails = await stripe.products.retrieve(product);
  } else if ('name' in product) {
    productDetails = product;
  } else {
    return null;
  }

  return {
    name: productDetails.name,
    description: productDetails.description,
    metadata: productDetails.metadata,
  };
};


export const getCustomer = async(id: string) => {
  try {
    return await stripe.customers.retrieve(id);
  } catch {
    return null;
  }
};

export const getSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return {
      ...subscription,
      productDetails: await getProductDetails(subscription.items.data[0].price.product)
    };
  } catch {
    return null;
  }
};