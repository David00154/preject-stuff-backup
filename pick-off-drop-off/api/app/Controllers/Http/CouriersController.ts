import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CouriersController {
  /**
   * show
   */
  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      await user?.load('courier')
      return user
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }
  /**
   * update
   */
  public async update({ auth, response, request, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('denyIfUserIsCustomer')
      await request.validate({
        schema: schema.create({
          name: schema.string(),
          year: schema.number(),
          color: schema.string([rules.alpha()]),
          license_plate: schema.string(),
          model: schema.string(),
          make: schema.string(),
        }),
      })
      const user = auth.user
      user //
        ?.merge({
          name: request.only(['name']).name,
        })
        .save()
      const data = request.only(['year', 'model', 'make', 'color', 'license_plate'])
      await user?.related('courier').updateOrCreate(
        {},
        {
          ...data,
          licensePlate: data.license_plate,
        }
      )
      await user?.load('courier')
      return user
    } catch (error) {
      response.badRequest(error.messages ?? { message: error.message })
    }
  }
}
