/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  '/guide':{view:'Tips/guide'},
  '/tips':{view:'Tips/tips'},
  '/user/register': 'UserController.register',
  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /cv/create': 'CVController.create',
  'POST /cv/create': 'CVController.create',

  'GET /cv/:id/createContact': 'CVController.contactCreate',
  'POST /cv/:id/createContact': 'CVController.contactCreate',
  'GET /cv/:id/createContact/:fk': 'CVController.contactAsso',
  'POST /cv/:id/createContact/:fk': 'CVController.contactAsso',
  
  // 'GET /cv/:id/createContact': 'ContactController.contactCreate',
  // 'POST /cv/:id/createContact': 'ContactController.contactCreate',
  // 'GET /cv/:id/createContact/:fk': 'ContactController.contactAsso',
  // 'POST /cv/:id/createContact/:fk': 'ContactController.contactAsso',
  
  // 'GET /contact/create': 'ContactController.create',
  // 'POST /contact/create': 'ContactController.create',
  
  // 'GET /activity/create': 'ActivityController.create',
  // 'POST /activity/create': 'ActivityController.create',
  // 'GET /activity/update/:id': 'ActivityController.update',
  // 'POST /activity/update/:id': 'ActivityController.update',

  // 'GET /edu/create': 'EduController.create',
  // 'POST /edu/create': 'EduController.create',
  // 'GET /edu/update/:id': 'EduController.update',
  // 'POST /edu/update/:id': 'EduController.update',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};