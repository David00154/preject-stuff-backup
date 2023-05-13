import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Delivery from './Delivery'

export default class Courier extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public year: string

  @column()
  public make: string

  @column()
  public model: string

  @column()
  public color: string

  @column()
  public userId: number

  @column()
  public licensePlate: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Delivery)
  public deliveries: HasMany<typeof Delivery>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
