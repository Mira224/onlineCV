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
  '/tempalte1': { view: 'template/template1' },
  '/tempalte2': { view: 'template/template2' },
  '/dark': { view: 'template/template-dark' },
  '/white': { view: 'template/template-white' },

  '/guide':{view:'Tips/guide'},
  '/tips':{view:'Tips/tips'},

  '/admin': 'UserController.listUser',
  '/user/register': 'UserController.register',
  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /cv/create': 'CVController.createCV',
  'POST /cv/create': 'CVController.createCV',

  'POST /cv/:id/delete': 'CVController.deletecv',

  // 'GET /cv/:id/update':'CVController.updatecv,',
  // 'POST /cv/:id/update':'CVController.updatecv,',
  

  'GET /cv/:id/addContact': 'CVController.addContact',
  'POST /cv/:id/addContact': 'CVController.addContact',
  'GET /cv/:id/addEdu': 'CVController.addEdu',
  'POST /cv/:id/addEdu': 'CVController.addEdu',
  'GET /cv/:id/addWork': 'CVController.addWork',
  'POST /cv/:id/addWork': 'CVController.addWork',
  'GET /cv/:id/addSkill': 'CVController.addSkill',
  'POST /cv/:id/addSkill': 'CVController.addSkill',
  'GET /cv/:id/addActivity': 'CVController.addActivity',
  'POST /cv/:id/addActivity': 'CVController.addActivity',
  'GET /cv/:id/addRef': 'CVController.addRef',
  'POST /cv/:id/addRef': 'CVController.addRef',
  'GET /cv/:id/chooseTemplate': 'CVController.chooseTemplate',
  'POST /cv/:id/chooseTemplate': 'CVController.chooseTemplate',
  
  
 
  'GET /cv/overview': 'UserController.overview',
  'POST /cv/overview': 'UserController.overview',
  'GET /:id/cv/:title': 'CVController.cv',




  


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
