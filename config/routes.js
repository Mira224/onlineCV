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

  
  
  '/user/register': 'UserController.register',
  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /cv/create': 'CVController.createCV',
  'POST /cv/create': 'CVController.createCV',

  'GET /cv/delete/:id': 'CVController.deletecv',
// view fixed cv with template//
  '/cv/dark/:id':"CVController.previewDark",
  '/cv/white/:id':"CVController.previewWhite",

  // 'GET /cv/:id/update':'CVController.updatecv,',
  // 'POST /cv/:id/update':'CVController.updatecv,',


  'GET /cv/updateEdu/:id':'CVController.updateEdu',
  'POST /cv/updateEdu/:id':'CVController.updateEdu',
//CV create content
  'GET /cv/content/:id': 'CVController.CVcontentManagement',
  'POST /cv/content/:id': 'CVController.CVcontentManagement',
  'GET /cv/addContact/:id': 'CVController.addContact',
  'POST /cv/addContact/:id': 'CVController.addContact',
  'GET /cv/addEdu/:id': 'CVController.addEdu',
  'POST /cv/addEdu/:id': 'CVController.addEdu',
  'GET /cv/addWork/:id': 'CVController.addWork',
  'POST /cv/addWork/:id': 'CVController.addWork',
  'GET /cv/addSkill/:id': 'CVController.addSkill',
  'POST /cv/addSkill/:id': 'CVController.addSkill',
  'GET /cv/addActivity/:id': 'CVController.addActivity',
  'POST /cv/addActivity/:id': 'CVController.addActivity',
  'GET /cv/addRef/:id': 'CVController.addRef',
  'POST /cv/addRef:id': 'CVController.addRef',
  'GET /cv/chooseTemplate/:id': 'CVController.chooseTemplate',
  'POST /cv/chooseTemplate/:id': 'CVController.chooseTemplate',

//CV Update content
'GET /cv/updateContact/:id': 'CVController.updateContact',
'POST /cv/updateContact/:id/': 'CVController.updateContact',
'GET /cv/updateEdu/:id': 'CVController.updateEdu',
'POST /cv/updateEdu/:id': 'CVController.updateEdu',
'GET /cv/updateWork/:id': 'CVController.updateWork',
'POST /cv/updateWork/:id': 'CVController.updateWork',
'GET /cv/updateSkill/:id': 'CVController.updateSkill',
'POST /cv/updateSkill/:id': 'CVController.updateSkill',
'GET /cv/updateActivity/:id': 'CVController.updateActivity',
'POST /cv/updateActivity/:id': 'CVController.updateActivity',
'GET /cv/updateRef/:id': 'CVController.updateRef',
'POST /cv//updateRef:id': 'CVController.updateRef',
'GET /cv/chooseTemplate/:id': 'CVController.updateTemplate',
'POST /cv/chooseTemplate/:id': 'CVController.updateTemplate',


  'GET /cv/overview': 'CVController.overview',
  'POST /cv/overview': 'CVController.overview',
  'GET /cv/view/:id': 'CVController.viewCV',
  'POST /cv/view/:id': 'CVController.viewCV',
  'GET /cv/changeStatus/:id':'CVController.changeStatus',
  'POST /cv/changeStatus/:id':'CVController.changeStatus',

  'GET /changePW/:id':'UserController.changePassword',
  'POST /changePW/:id':'UserController.changePassword',

  '/admin': { view: 'admin/adminCenter' },
  'GET /admin/searchuser':'UserController.searchUser',
  'POST /admin/searchuser':'UserController.searchUser',
  // 'GET /admin/searchUser':'UserController.searchUser',
  // 'POST /admin/searchUser':'UserController.searchUser',
  'GET /admin/paginate':'UserController.paginate',
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
