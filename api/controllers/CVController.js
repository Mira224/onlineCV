/**
 * CVController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function (req, res) {

    if (req.method == "GET") return res.view('talent/createCV');

    var cv = await CV.create(req.body).fetch();

    return res.view('/talent/createCVContent', { cvid: cv.id });
  },
  contactCreate: async function (req, res) {

    if (req.method == "GET") return res.view('/talent/createCVContent');

    var contact = await Contact.create(req.body).fetch();
   return res.redirect('/cv/'+req.cvid+'/contact/'+contact.id);

  },
  contactAsso: async function (req, res) {

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatCon = await Contact.findOne(req.params.fk).populate("contactBelongCV", { id: req.params.id });

    if (!thatCon) return res.status(404).json("Contact not found.");


    await CV.addToCollection(req.params.id, "cvHasContact").members(req.params.fk);

    return res.redirect('/cv/'+req.cvid+'/contact/'+contact.id);
  },

};

