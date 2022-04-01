/**
 * CV.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: "string"
    },
    link: {
      type: 'string',
    },
    template: {
      type: 'string',
    },
    name: {
      type: 'string'
    },
    ps:{type:'string'},
   // avatar:{},
    email: { type: 'string' },
    mobile: { type: 'string' },
    education: {
      type: 'json'
    },
    work: {
      type: 'json'
    },
    skill: {
      type: 'json'
    },
    activity: {
      type: 'json'
    },
    project: {
      type: 'json'
    },
    reference: {
      type: 'json'
    },
    multimedia: {
      type: 'json'
    },
    /*True: public
    False:hidden*/
    status:{
      type:"string",
      isIn: ['public', 'private'],
      defaultsTo: 'private'
    },
    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner: {
      model: 'User'
    },

    // cvHasUser: {
    //   collection: 'User',
    //   via: 'userOwnCV',
    // },
    

  },

};

