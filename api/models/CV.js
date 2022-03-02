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
    template:{
      type: 'string',
    },
    tel:{
      type:'string'
    },
    fax:{
      type:'string'
    },
    education:{
      type:'json'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner:{
      model:'User'
    },

    // cvHasUser: {
    //   collection: 'User',
    //   via: 'userOwnCV',
    // },
    cvHasEdu: {
      collection: 'Edu',
      via: 'eduBelongCV'
    },
    cvHasIntern: {
      collection: 'Intern',
      via: 'internBelongCV'
    },
    cvHasActivity: {
      collection: 'Activity',
      via: 'activityBelongCV',
    },
    cvHasProj: {
      collection: 'Proj',
      via: 'projBelongCV'
    },
    cvHasSkill: {
      collection: 'Skill',
      via: 'skillBelongCV'
    },
    cvHasWork: {
      collection: 'Work',
      via: 'workBelongCV',
    },
    cvHasMultimedia: {
      collection: 'Multimedia',
      via: 'multimediaBelongCV',
    },
    cvHasContact:{
      collection:'Contact',
      via:'contactBelongCV',
    },
    cvHasRef:{
      collection:'Reference',
      via:'refBelongCV',
    },
  

  },

};

