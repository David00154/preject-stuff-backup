import type { EventsList } from '@ioc:Adonis/Core/Event'
import Ws from 'App/Services/Ws'

export default class DeliveryLocationUpdated {
  /**
   * broadcast
   */
  public async broadcast({ user }: EventsList['delivery:location_updated']) {
    Ws.io.emit('customer_' + user?.id, {})
  }
}
