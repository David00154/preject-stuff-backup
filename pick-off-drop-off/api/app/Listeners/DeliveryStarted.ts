import type { EventsList } from '@ioc:Adonis/Core/Event'
import Ws from 'App/Services/Ws'

export default class DeliveryStarted {
  /**
   * broadcast
   */
  public async broadcast({ user }: EventsList['delivery:started']) {
    Ws.io.emit('customer_' + user?.id, {})
  }
}
