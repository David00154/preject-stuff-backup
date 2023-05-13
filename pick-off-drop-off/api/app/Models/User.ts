import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Notifiable } from '@ioc:Verful/Notification/Mixins'
import Courier from './Courier'
import Delivery from './Delivery'

export default class User extends compose(BaseModel, Notifiable('notifications')) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null

  @column()
  public email: string

  // @column({ serializeAs: null })
  // public password: string
  @column()
  public loginCode: string | null

  @column()
  public rememberMeToken: string | null

  @hasOne(() => Courier)
  public courier: HasOne<typeof Courier>

  @hasMany(() => Delivery)
  public deliveries: HasMany<typeof Delivery>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @beforeSave()
  // public static async hashPassword (user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await Hash.make(user.password)
  //   }
  // }
}
