/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'

Event.on('delivery:accepted', 'DeliveryAccepted.broadcast')
Event.on('delivery:ended', 'DeliveryEnded.broadcast')
Event.on('delivery:started', 'DeliveryStarted.broadcast')
Event.on('delivery:location_updated', 'DeliveryLocationUpdated.broadcast')
