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

  '/guide': { view: 'Tips/guide' },
  '/tips': { view: 'Tips/tips' },

  'cv/:id':'CVController.viewCV',

  
  '/admin': 'UserController.listUser',
  '/user/register': 'UserController.register',
  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /cv/create': 'CVController.createCV',
  'POST /cv/create': 'CVController.createCV',

  'GET /cv/:id/delete': 'CVController.deletecv',
// view fixed cv with template//
  '/cv/:id/dark':"CVController.previewDark",

  // 'GET /cv/:id/update':'CVController.updatecv,',
  // 'POST /cv/:id/update':'CVController.updatecv,',


  'GET /cv/:id/updateEdu':'CVController.updateEdu',
  'POST /cv/:id/updateEdu':'CVController.updateEdu',
//CV create content
  'GET /cv/:id/content': 'CVController.CVcontentManagement',
  'POST /cv/:id/content': 'CVController.CVcontentManagement',
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

//CV Update content
'GET /cv/:id/updateContact': 'CVController.updateContact',
'POST /cv/:id/updateContact': 'CVController.updateContact',
'GET /cv/:id/updateEdu': 'CVController.updateEdu',
'POST /cv/:id/updateEdu': 'CVController.updateEdu',
'GET /cv/:id/updateWork': 'CVController.updateWork',
'POST /cv/:id/updateWork': 'CVController.updateWork',
'GET /cv/:id/updateSkill': 'CVController.updateSkill',
'POST /cv/:id/updateSkill': 'CVController.updateSkill',
'GET /cv/:id/updateActivity': 'CVController.updateActivity',
'POST /cv/:id/updateActivity': 'CVController.updateActivity',
'GET /cv/:id/updateRef': 'CVController.updateRef',
'POST /cv/:id/updateRef': 'CVController.updateRef',
'GET /cv/:id/chooseTemplate': 'CVController.updateTemplate',
'POST /cv/:id/chooseTemplate': 'CVController.updateTemplate',


  'GET /cv/overview': 'CVController.overview',
  'POST /cv/overview': 'CVController.overview',
  'GET /:id/cv/:title': 'CVController.cv',


  'GET /admin/':{ view: 'pages/adminCentre' },
  'GET /admin/alluser':'UserController.listUser',
  'POST /admin/alluser':'UserController.listUser',
  // 'GET /admin/searchUser':'UserController.searchUser',
  // 'POST /admin/searchUser':'UserController.searchUser',
  'GET /admin/paginate':'UserController.paginate',
 
  'POST /admin/allusers':'UserController.listUser',
  'POST /admin/:id/delete':'UserController.deleteUser',









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
