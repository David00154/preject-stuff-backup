import type { EventsList } from '@ioc:Adonis/Core/Event'
import Ws from 'App/Services/Ws'

export default class DeliveryEnded {
  /**
   * broadcast
   */
  public async broadcast({ user }: EventsList['delivery:ended']) {
    Ws.io.emit('customer_' + user?.id, {})
  }
}
