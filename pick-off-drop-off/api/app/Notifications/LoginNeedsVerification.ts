import { NotificationContract } from '@ioc:Verful/Notification'
import VerificationCodeEmail from 'App/Mailers/VerificationCodeEmail'
import User from 'App/Models/User'

export default class LoginNeedsVerification implements NotificationContract {
  public via(_: User) {
    return 'mail' as const
  }

  public toMail(notifiable: User) {
    return new VerificationCodeEmail(notifiable)
  }
}
