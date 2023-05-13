import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Delivery from 'App/Models/Delivery'
import Event from '@ioc:Adonis/Core/Event'

export default class DeliveriesController {
  /**
   * store
   */
  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('ensureIsCostumer')
      const payload = await request.validate({
        schema: schema.create({
          origin: schema.object().anyMembers(),
          destination: schema.object().anyMembers(),
          destination_name: schema.string(),
        }),
      })
      return await auth.user?.related('deliveries').create({
        ...payload,
        origin: JSON.stringify(payload.origin),
        destination: JSON.stringify(payload.destination),
      })
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }

  /**
   * show
   */
  public async show({ request, response, auth }: HttpContextContract) {
    try {
      const delivery = await Delivery.find(request.param('delivery'))

      await delivery?.load('user')
      await delivery?.load('courier')
      await delivery?.courier.load('user')

      if (delivery?.userId === auth.user?.id) {
        return delivery
      }

      if (delivery?.courier && auth.user?.courier) {
        if (delivery?.courierId === auth.user?.courier.id) {
          return delivery
        }
      }
      return response.status(404).json({
        message: 'Can not find this trip.',
      })
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }

  /**
   * accept
   */
  public async accept({ request, response, auth, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('ensureIsCourier')
      const payload = await request.validate({
        schema: schema.create({
          courier_location: schema.object().anyMembers(),
        }),
      })
      const delivery = await Delivery.find(request.param('delivery'))
      await delivery
        ?.merge({
          courierId: auth.user!.id,
          courierLocation: JSON.stringify(payload.courier_location),
        })
        .save()

      await delivery?.load('courier')
      await delivery?.courier.load('user')
      Event.emit('delivery:accepted', { delivery: delivery, user: auth.user })

      return delivery
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }
  /**
   * start
   */
  public async start({ request, response, auth }: HttpContextContract) {
    try {
      const delivery = await Delivery.find(request.param('delivery'))
      await delivery
        ?.merge({
          isStarted: true,
        })
        .save()
      await delivery?.load('courier')
      await delivery?.courier.load('user')
      Event.emit('delivery:started', { delivery: delivery, user: auth.user })
      return delivery
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }
  /**
   * end
   */
  public async end({ request, response, auth }: HttpContextContract) {
    try {
      const delivery = await Delivery.find(request.param('delivery'))
      await delivery
        ?.merge({
          isComplete: true,
        })
        .save()
      await delivery?.load('courier')
      await delivery?.courier.load('user')
      Event.emit('delivery:ended', { delivery: delivery, user: auth.user })
      return delivery
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }
  /**
   * location
   */
  public async location({ request, response, auth }: HttpContextContract) {
    try {
      const delivery = await Delivery.find(request.param('delivery'))
      const payload = await request.validate({
        schema: schema.create({
          courier_location: schema.string(),
        }),
      })
      await delivery
        ?.merge({
          courierLocation: payload.courier_location,
        })
        .save()
      await delivery?.load('courier')
      await delivery?.courier.load('user')
      Event.emit('delivery:location_updated', { delivery: delivery, user: auth.user })
      return delivery
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }
}
