import type { EventsList } from '@ioc:Adonis/Core/Event'
import Ws from 'App/Services/Ws'

export default class DeliveryAccepted {
  /**
   * broadcast
   */
  public async broadcast({ user }: EventsList['delivery:accepted']) {
    Ws.io.emit('customer_' + user?.id, {})
  }
}
