import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class VerificationCodeEmail extends BaseMailer {
  constructor(private user: User) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "VerificationCodeEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    const loginCode = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString()
    await this.user
      .merge({
        loginCode,
      })
      .save()
    message //
      .subject('Login code')
      .from('test@example.com')
      .to(this.user.email!)
      .text('Your Zazz login code is ' + loginCode + ", don't share this with anyone! ")
  }
}
