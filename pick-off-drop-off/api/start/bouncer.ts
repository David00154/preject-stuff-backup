/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
export const { actions } = Bouncer.define('ensureIsCostumer', async (user: User) => {
  //
  //
  //
  await user.load('customer')
  await user.load('courier')
  if (!user.customer || user.courier) {
    return Bouncer.deny('This is a customer only route')
  }
  return true
})
  .define('ensureIsCourier', async (user: User) => {
    //
    //
    //
    await user.load('customer')
    await user.load('courier')
    if (!user.courier || user.customer) {
      return Bouncer.deny('This is a courier only route')
    }
    return true
  })
  .define('denyIfUserIsCustomer', async (user: User) => {
    await user.load('courier')
    await user.load('customer')
    if (user.customer) {
      return Bouncer.deny('You are already a customer')
    }
    return true
  })
  .define('denyIfUserIsCourier', async (user: User) => {
    await user.load('courier')
    await user.load('customer')
    if (user.courier) {
      return Bouncer.deny('You are already a courier')
    }
    return true
  })

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
