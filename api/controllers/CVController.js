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
    if (!cv) {
      console.log("not exist.");
      return res.notFound();
    }

    await User.addToCollection(req.session.userid, 'userOwnCV').members(cv.id)

    console.log(cv);
    return res.view('talent/createContent', { cv: cv });
  },


  addContact: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createContact', { cv: thatCV });
    }

    else {

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.view('talent/createContent', { cv: updatedCV })
    }

  },

  addEdu: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createEdu', { cv: thatCV });
    } else {

      let skills = JSON.stringify(req.body)

      // var json = new JSONObject();

      // json.put("school", req.params.school);
      // json.put("sTime", req.params.sTime);
      // json.put("eTime", req.params.eTime);
      // json.put('description', req.params.description);
      // message = json.toString();
      console.log(skills);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.education) {
        thatCV.education = [req.body]
      } else {
        thatCV.education.push(req.body)
      }

      await CV.updateOne(thatCV).set({education:thatCV.education})
      // await thatCV.education.push(json);
      // console.log(hatCV.education);

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addWork: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createWork', { cv: thatCV });
    } else {
      var json = new JSONObject();

      json.put("org", req.params.org);
      json.put("position", req.params.position);
      json.put("sTime", req.params.sTime);
      json.put("eTime", req.params.eTime);
      json.put('description', req.params.description);
      message = json.toString();
      console.log(message);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");
      await thatCV.work.push(json);
      console.log(thatCV.work);

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addActivity: async function (req, res) {

    if (req.method == "GET") {
      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createActivity', { cv: thatCV });
    }
    else {
      var json = new JSONObject();

      json.put("title", req.params.title);
      json.put("sTime", req.params.sTime);
      json.put("eTime", req.params.eTime);
      json.put('description', req.params.description);
      message = json.toString();
      console.log(message);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");
      await thatCV.activity.push(json);
      console.log(thatCV.activity);

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addSkill: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createSkill', { cv: thatCV });
    }
    else {
      var json = new JSONObject();


      let skills = JSON.stringify(req.body)

      // json.put("content", req.params.content);
      // json.put('level', req.params.level);
      // message = json.toString();
      console.log(message);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");
      await thatCV.skill.push(json);
      console.log(skill);

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addRef: async function (req, res) {

    if (req.method == "GET") {
      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createRef', { cv: thatCV });
    } else {

      var json = new JSONObject();

      json.put("name", req.params.name);
      json.put("relationship", req.params.relationship);
      json.put("comment", req.params.comment);
      json.put('contact', req.params.contact);
      message = json.toString();
      console.log(message);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");
      var edu = thatCV.education.push(json);
      console.log(edu);

      return res.view('talent/createContent', { cv: thatCV });
    }

  },


  /*list all the parts associated with cv*/
 
  previewCV: async function (req, res) {
    if (req.method == "GET") return res.view('talent/preview');

  },



  delete: async function (req, res) {

    var deletedCV = await Person.destroyOne(req.params.id);

    if (!deletedCV) return res.notFound();

    return res.redirct('/cv/overview');
  },





  //////////////////////////////////////////////


  cv: async function (req, res) {
    // let user = await User.findOne({ username: req.params.username });
    let cv = await CV.findOne({ id: req.params.id });

    // var edu = cv.education;
    // var work = cv.work;
    // var skill = cv.skill;
    // var activity = cv.activity;
    // var reference = cv.reference;

    var template = cv.template;


    return res.view('template/' + template, { cv: cv })
  },


};

