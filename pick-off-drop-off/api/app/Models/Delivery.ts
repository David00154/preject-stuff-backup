import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Courier from './Courier'

export default class Delivery extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    serialize(value) {
      return Boolean(value)
    },
  })
  public isStarted: boolean

  @column({
    serialize(value) {
      return Boolean(value)
    },
  })
  public isComplete: boolean

  @column({
    serialize(value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    },
  })
  public origin: string | null

  @column()
  public userId: number

  @column()
  public courierId: number

  @column()
  public customerId: number

  @column({
    serialize(value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    },
  })
  public destination: string | null

  @column()
  public destinationName: string | null

  @column({
    serialize(value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    },
  })
  public courierLocation: string | null

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Courier)
  public courier: BelongsTo<typeof Courier>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
