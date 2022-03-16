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
    return res.view('talent/create/createContact', { cv: cv })
    //  return res.redirect('/cv/' + cv.id + '/content');
  },


  CVcontentManagement: async function (req, res) {
    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.status(404).json("CV not found.");

    //  return res.redirect('cv/' + thatCV.id + '/content', { cv: thatCV });
    return res.view('talent/createContent', { cv: thatCV });
  },

  //create content of each part
  addContact: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/create/createContact', { cv: thatCV });
    }

    else {

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.redirect('/cv/' + thatCV.id + '/content');
      //     return res.view('talent/createContent', { cv: updatedCV })
    }

  },

  addEdu: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);


      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/create/createEdu', { cv: thatCV });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.school)) {
        data = req.body.school.map(function (v, i) {

          console.log("v:" + v);
          return {
            school: v,
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      console.log(data);
      let edu = JSON.stringify(data)
      console.log(edu);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.education) {
        thatCV.education = [req.body]
      } else {
        thatCV.education.push(req.body)
      }

      await CV.updateOne(thatCV).set({ education: thatCV.education })

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addWork: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/create/createWork', { cv: thatCV });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.org)) {
        data = req.body.school.map(function (v, i) {
          return {
            org: v,
            position: req.body.position[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      console.log(data);
      let work = JSON.stringify(data)
      console.log(work);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.work) {
        thatCV.work = [req.body]
      } else {
        thatCV.work.push(req.body)
      }

      await CV.updateOne(thatCV).set({ work: thatCV.work })
      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addActivity: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);


      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/create/createActivity', { cv: thatCV });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.activity)) {
        data = req.body.activity.map(function (v, i) {
          return {
            title: v,
            org: req.body.org[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      console.log(data);
      let act = JSON.stringify(data)
      console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.activity) {
        thatCV.activity = [req.body]
      } else {
        thatCV.activity.push(req.body)
      }

      await CV.updateOne(thatCV).set({ activity: thatCV.activity })

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  addSkill: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);


      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/create/createSkill', { cv: thatCV });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.skill)) {
        data = req.body.activity.map(function (v, i) {
          return {
            content: v,
            org: req.body.level[i],

          }
        })
      }
      console.log(data);
      let act = JSON.stringify(data)
      console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.skill) {
        thatCV.skill = [req.body]
      } else {
        thatCV.skill.push(req.body)
      }

      await CV.updateOne(thatCV).set({ skill: thatCV.skill })

      return res.view('talent/createContent', { cv: thatCV });
    }
  },
  addRef: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);


      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/create/createRef', { cv: thatCV });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.reference)) {
        data = req.body.reference.map(function (v, i) {
          return {
            name: v,
            relationship: req.body.relationship[i],
            contact: req.body.contact[i],
            comment: req.body.comment[i],

          }
        })
      }
      console.log(data);
      let act = JSON.stringify(data)
      console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.reference) {
        thatCV.reference = [req.body]
      } else {
        thatCV.reference.push(req.body)
      }

      await CV.updateOne(thatCV).set({ reference: thatCV.reference })

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  chooseTemplate: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.notFound();

      return res.view('talent/createContent', { cv: thatCV });

    } else {

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.view('talent/createContent', { cv: thatCV });
    }
  },

  //update content of each part
  updateContact: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/update/updateContact', { cv: thatCV});
    }

    else {

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.redirect('/cv/' + thatCV.id + '/content', { cv: updatedCV });
      //     return res.view('talent/createContent', { cv: updatedCV })
    }

  },

  updateEdu: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/createEdu', { cv: thatCV, edus: thatCV.education });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.school)) {
        data = req.body.school.map(function (v, i) {
          return {
            school: v,
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      console.log(data);
      let edu = JSON.stringify(data)

      console.log(edu);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      if (!thatCV.education) {
        thatCV.education = [req.body]
      } else {
        thatCV.education.push(req.body)
      }

      await CV.updateOne(thatCV).set({ education: thatCV.education })

      return res.view('talent/createContent', { cv: thatCV });
    }


  },














  /*list all the parts associated with cv*/

  previewCV: async function (req, res) {
    if (req.method == "GET") return res.view('talent/preview');

  },

  overview: async function (req, res) {
    //if (req.method == "GET") return res.view('pages/allcv');

    var user = await User.findOne(req.session.userid).populate("userOwnCV");

    if (!user) return res.notFound();


    return res.view('pages/allcv', { user: user, cvs: user.userOwnCV })
  },


  deletecv: async function (req, res) {

    var deletedCV = await CV.destroyOne(req.params.id);

    if (!deletedCV) return res.notFound();

    return res.redirect('/cv/overview');
  },

  // updatecv: async function (req, res) {
  //   return res.redirect('/cv/overview');
  // },





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

