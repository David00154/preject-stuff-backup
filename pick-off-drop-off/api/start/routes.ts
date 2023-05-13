/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'LoginController.submit')
Route.post('/login/verify', 'LoginController.verify')
Route.post('/logout', async ({ auth }) => {
  await auth.use('api').revoke()

  return {
    revoked: true,
  }
})

Route.group(() => {
  Route.get('/courier', 'CouriersController.show')
  // you can't create be a courier if you already are a customer
  Route.post('/courier', 'CouriersController.update')
  //
  Route.get('/customer', 'CustomersController.show')
  // you can't create be a customer if you already are a courier
  Route.post('/customer', 'CustomersController.update')

  // you must be a customer to create a delivery
  Route.post('/delivery', 'DeliveriesController.store')
  Route.get('/delivery/:delivery', 'DeliveriesController.show')
  Route.post('/delivery/:delivery/accept', 'DeliveriesController.accept')
  Route.post('/delivery/:delivery/start', 'DeliveriesController.start')
  Route.post('/delivery/:delivery/end', 'DeliveriesController.end') // Only the customer can end
  Route.post('/delivery/:delivery/location', 'DeliveriesController.location')

  Route.get('/user', function ({ auth }) {
    return auth.user
  })
})
  .prefix('api')
  .middleware('auth')
