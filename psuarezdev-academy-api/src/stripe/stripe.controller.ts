import type { Request, Response } from 'express';
import { GET, POST, PUT, route } from 'awilix-express';
import { StripeService } from './stripe.service';
import { AuthenticatedRequest } from '@/middlewares/auth';
import { BaseController } from '@/shared/base.controller';

@route('/api/stripe')
export class StripeController extends BaseController {
  constructor(
    private readonly stripeService: StripeService
  ) { super(); }

  @route('/subscriptions')
  @GET()
  async getSubscriptions(req: Request, res: Response) {
    try {
      const subscriptions = await this.stripeService.getSubscriptions();

      if (!subscriptions) {
        return res.status(500).json(
          { message: 'Error al obtener las suscripciones' }
        );
      }

      return res.status(200).json(subscriptions);
    } catch(err) {
      return this.handleError(res, err);
    }
  }

  @route('/subscriptions')
  @PUT()
  async updateSuscription(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.subscriptionId) {
        return res.status(401).json(
          { message: 'Sin autorización' }
        );
      }

      const isCancelled = await this.stripeService.updateSuscription(req.user);

      if (isCancelled === null) {
        return res.status(500).json({
          message: 'Error while trying to update subscription'
        });
      }

      return res.status(200).json({
        message: `Suscripción ${isCancelled ? 'cancelada' : 'reactivada'}`
      });
    } catch(err) {
      return this.handleError(res, err);
    }
  }

  @route('/checkout')
  @POST()
  async checkout(req: AuthenticatedRequest, res: Response) {
    try {
      const { priceId } = req.body;

      if (!req.user) return this.unathorized(res);

      if (!priceId) {
        return res.status(400).json(
          { message: 'El Id de la suscription es obligatorio' }
        );
      }

      const subscriptions = await this.stripeService.getSubscriptions();

      if (!subscriptions || subscriptions.length === 0 || !(subscriptions?.some(sub => sub.id === priceId))) {
        return res.status(400).json(
          { message: 'El Id no es valido' }
        );
      }

      const session = await this.stripeService.checkout(priceId, req.user);

      if (!session) {
        return res.status(500).json(
          { message: 'Error el crear la sessión del pago' }
        );
      }

      return res.status(201).json({ url: session.url });
    } catch(err) {
      return this.handleError(res, err);
    }
  }

  @route('/webhooks')
  @POST()
  async webhooks(req: Request, res: Response) {
    try {
      const signature = req.headers['Stripe-Signature'] as string | null;

      if (!signature) {
        return res.status(400).json(
          { message: 'Falta el Stripe Signature' }
        );
      }

      await this.stripeService.webhooks(req.body, signature);

      return res.status(204).end();
    } catch(err) {
      return this.handleError(res, err);
    }
  }
}
