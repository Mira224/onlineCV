/**
 * CVController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  createCV: async function (req, res) {

    if (req.method == "GET") return res.view('talent/createCV');

    var cv = await CV.create(req.body).fetch();

    return res.redirect('/cv/content/:' + cv.id, { cv: cv });
  },

  addContent: async function (req, res) {

    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.notFound();

    return res.view('talent/addContent', { cv: thatCV });

  },
  addContact: async function (req, res) {

    var contact = await Contact.create(req.body).fetch();

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatContact = await Contact.findOne(contact.id).populate("contactBelongCV", { id: req.params.id });

    if (!thatContact) return res.status(404).json("Contact not found.");

    await CV.addToCollection(req.params.id, "contactBelongCV").members(contact.id);

    return res.res.status(200).json('Save Contact');

  },
  addEdu: async function (req, res) { },

  addPro: async function (req, res) { },

  addSkill: async function (req, res) { },

  addMultimedia: async function (req, res) { },









  //////////////////////////////////////////////

  contactCreate: async function (req, res) {

    if (req.method == "GET") return res.view('/talent/createCVContent');

    var contact = await Contact.create(req.body).fetch();
    return res.redirect('/cv/' + req.cvid + '/contact/' + contact.id);

  },
  contactAsso: async function (req, res) {

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatCon = await Contact.findOne(req.params.fk).populate("contactBelongCV", { id: req.params.id });

    if (!thatCon) return res.status(404).json("Contact not found.");


    await CV.addToCollection(req.params.id, "cvHasContact").members(req.params.fk);

    return res.redirect('/cv/' + req.cvid + '/contact/' + contact.id);
  },

};

