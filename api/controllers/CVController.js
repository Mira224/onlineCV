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

    return res.view('talent/createCVContent', { cv: cv });
  },

  addContent: async function (req, res) {

    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.notFound();

    return res.view('talent/addContent', { cv: thatCV });

  },
  addContact: async function (req, res) {

    // if (req.method == "GET") return res.view('talent/createContact');

    var contact = await Contact.create(req.body).fetch();

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatContact = await Contact.findOne(contact.id).populate("contactBelongCV", { id: req.params.id });

    if (!thatContact) return res.status(404).json("Contact not found.");

    await CV.addToCollection(req.params.id, "cvHasContact").members(contact.id);

    return res.res.status(200).json('Save Contact');

  },

  addContact: async function (req, res) {
    if (req.method == "GET") {

      var thatContent = await Content.findOne(req.params.id);

      if (!thatContent) return res.notFound();

      return res.view('update/updateContact', { contact: thatContact });

    } else {

      var updatedPerson = await Person.updateOne(req.params.id).set(req.body);

      if (!updatedPerson) return res.notFound();

      return res.ok();
    }
  },
  deleteContact: async function (req, res){
    var deletedContact = await Contact.destroyOne(req.params.id);

    if (!deletedContact) return res.notFound();

    return res.ok(); 
  },
  addEdu: async function (req, res) {
    var edu = await Edu.create(req.body).fetch();

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatEdu = await Edu.findOne(edu.id).populate("eduBelongCV", { id: req.params.id });

    if (!thatEdu) return res.status(404).json("Edu not found.");

    await CV.addToCollection(req.params.id, "cvHasEdu").members(edu.id);

    return res.res.status(200).json('Save Edu');

  },

  addPro: async function (req, res) {
    var proj = await Proj.create(req.body).fetch();

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatProj = await Proj.findOne(proj.id).populate("projBelongCV", { id: req.params.id });

    if (!thatProj) return res.status(404).json("Proj not found.");

    await CV.addToCollection(req.params.id, "cvHasProj").members(proj.id);

    return res.res.status(200).json('Save project');
  },

  addSkill: async function (req, res) {
    var skill = await Skill.create(req.body).fetch();

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatSkill = await Proj.findOne(skill.id).populate("skillBelongCV", { id: req.params.id });

    if (!thatSkill) return res.status(404).json("Skill not found.");

    await CV.addToCollection(req.params.id, "cvHasSkill").members(skill.id);

    return res.res.status(200).json('Save skill');
  },
  addExperience: async function (req, res) {
    var work = await Work.create(req.body).fetch();

    if (!await CV.findOne(req.params.id)) return res.status(404).json("CV not found.");

    var thatWork = await Work.findOne(work.id).populate("workBelongCV", { id: req.params.id });

    if (!thatWork) return res.status(404).json("Work not found.");

    await CV.addToCollection(req.params.id, "cvHaswork").members(work.id);

    return res.res.status(200).json('Save work');
  },

  // addMultimedia: async function (req, res) { },

  // generateLink: async function (req, res) { },

  /*list all the parts associated with cv*/
  modifyContent: async function (req, res) {




  },
  previewCV: async function (req, res) {
    if (req.method == "GET") return res.view('talent/preview');

  },







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


  cv: async function(req, res) {
    let user = await User.findOne({username:req.params.username})

    return res.view('')
  }

};

