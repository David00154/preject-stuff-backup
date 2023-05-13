import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import EmailErrorException from 'App/Exceptions/EmailErrorException'
import User from 'App/Models/User'
import LoginNeedsVerification from 'App/Notifications/LoginNeedsVerification'
export default class LoginController {
  /**
   * submit
   */
  public async submit({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({
        schema: schema.create({
          email: schema.string([rules.email()]),
        }),
      })

      const user = await User.firstOrCreate(payload)
      if (!user) {
        return response.status(401).json({
          message: 'Could not process a user with that email address.',
        })
      }
      try {
        await user.notify(new LoginNeedsVerification())
      } catch (error) {
        throw new EmailErrorException('Unable to send otp email', 503, 'E_SERVICE_UNAVAILABLE')
      }
      return response.status(201).json({
        message: 'Email message notification sent.',
      })
    } catch (error) {
      response.badRequest(error.messags ?? { message: error.message })
    }
  }

  /**
   * verify
   */
  public async verify({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate({
        schema: schema.create({
          email: schema.string([rules.email()]),
          login_code: schema.string(),
        }),
      })
      const user = await User.query() //
        .from('users')
        .where('email', payload.email)
        .where('login_code', payload.login_code)
        .first()
      if (user) {
        user
          .merge({
            loginCode: null,
          })
          .save()
        const { token } = await auth.use('api').generate(user, {
          // expiresIn: '1 mins',
          expiresIn: '2 days',
        })
        return response.status(200).json({
          token,
        })
      }
      return response.status(401).json({
        message: 'Invalid email or verification code.',
      })
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
