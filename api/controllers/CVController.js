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

      return res.view('talent/create/createEdu', { cv: updatedCV });
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
          return {
            school: v,
            major: req.body.major[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      // console.log(data);
      // let edu = JSON.stringify(data)
      // console.log(edu);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.education) {
      //   thatCV.education = [req.body]
      // } else {
      thatCV.education = data;
      // }
      console.log(thatCV);
      await CV.updateOne(thatCV.id).set({ education: thatCV.education })

      return res.view('talent/create/createWork', { cv: thatCV });
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
        data = req.body.org.map(function (v, i) {
          return {
            org: v,
            position: req.body.position[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      // console.log(data);
      // let work = JSON.stringify(data)
      // console.log(work);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.work) {
      //   thatCV.work = [req.body]
      // } else {
      thatCV.work = data;
      // }

      await CV.updateOne(thatCV.id).set({ work: thatCV.work })
      return res.view('talent/create/createActivity', { cv: thatCV });
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
        data = req.body.title.map(function (v, i) {
          return {
            title: v,
            org: req.body.org[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      // console.log(data);
      // let act = JSON.stringify(data)
      // console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.activity) {
      //   thatCV.activity = [req.body]
      // } else {
      thatCV.activity = data;
      // }

      await CV.updateOne(thatCV.id).set({ activity: thatCV.activity })

      return res.view('talent/create/createSkill', { cv: thatCV });
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
        data = req.body.content.map(function (v, i) {
          return {
            content: v,
            level: req.body.level[i],
          }
        })
      }
      // console.log(data);
      // let act = JSON.stringify(data)
      // console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.skill) {
      //   thatCV.skill = [req.body]
      // } else {
      thatCV.skill = data;
      // }

      await CV.updateOne(thatCV.id).set({ skill: thatCV.skill })

      return res.view('talent/create/createRef', { cv: thatCV });
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
        data = req.body.name.map(function (v, i) {
          return {
            name: v,
            relationship: req.body.relationship[i],
            contact: req.body.contact[i],
            comment: req.body.comment[i],

          }
        })
      }
      // console.log(data);
      // let act = JSON.stringify(data)
      // console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.reference) {
      //   thatCV.reference = [req.body]
      // } else {
      thatCV.reference = data;
      // }

      await CV.updateOne(thatCV.id).set({ reference: thatCV.reference })

      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  chooseTemplate: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.notFound();

      return res.view('talent/create/chooseTemplate', { cv: thatCV });

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

      return res.view('talent/update/updateContact', { cv: thatCV });
    }

    else {

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.view('talent/createContent', { cv: updatedCV })
    }

  },

  updateEdu: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");
      console.log(thatCV);

      return res.view('talent/update/updateEdu', { cv: thatCV, edus: thatCV.education });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.school)) {
        data = req.body.school.map(function (v, i) {
          return {
            school: v,
            major: req.body.major[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      // console.log(data);
      // let edu = JSON.stringify(data)

      // console.log(edu);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.education) {
      //   thatCV.education = [req.body]
      // } else {
      thatCV.education = data
      // }

      await CV.updateOne(thatCV.id).set({ education: thatCV.education })

      return res.view('talent/createContent', { cv: thatCV });
    }
  },
  updateWork: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/update/updateWork', { cv: thatCV, works: thatCV.work });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.org)) {
        data = req.body.org.map(function (v, i) {
          return {
            org: v,
            position: req.body.position[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      // console.log(data);
      // let work = JSON.stringify(data)
      // console.log(work);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.work) {
      //   thatCV.work = [req.body]
      // } else {
      thatCV.work = data;
      // }

      await CV.updateOne(thatCV.id).set({ work: thatCV.work })
      return res.view('talent/createContent', { cv: thatCV });
    }

  },
  updateActivity: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/update/updateActivity', { cv: thatCV, activities: thatCV.activity });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.activity)) {
        data = req.body.title.map(function (v, i) {
          return {
            title: v,
            org: req.body.org[i],
            sTime: req.body.sTime[i],
            eTime: req.body.eTime[i],
            description: req.body.description[i],
          }
        })
      }
      // console.log(data);
      // let act = JSON.stringify(data)
      // console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.activity) {
      //   thatCV.activity = [req.body]
      // } else {
      thatCV.activity = data;
      // }

      await CV.updateOne(thatCV.id).set({ activity: thatCV.activity })

      return res.view('talent/createContent', { cv: thatCV });
    }
  },
  updateSkill: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/update/updateSkill', { cv: thatCV, skills: thatCV.skill });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.skill)) {
        data = req.body.content.map(function (v, i) {
          return {
            content: v,
            level: req.body.level[i],
          }
        })
      }
      // console.log(data);
      // let act = JSON.stringify(data)
      // console.log(act);
      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.skill) {
      //   thatCV.skill = [req.body]
      // } else {
      thatCV.skill = data;
      // }

      await CV.updateOne(thatCV.id).set({ skill: thatCV.skill })

      return res.view('talent/createContent', { cv: thatCV });
    }
  },
  updateRef: async function (req, res) {

    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);


      if (!thatCV) return res.status(404).json("CV not found.");

      return res.view('talent/update/updateRef', { cv: thatCV, refs: thatCV.reference });
    } else {

      let data = req.body;
      if (Array.isArray(req.body.reference)) {
        data = req.body.name.map(function (v, i) {
          return {
            name: v,
            relationship: req.body.relationship[i],
            contact: req.body.contact[i],
            comment: req.body.comment[i],

          }
        })
      }
      // console.log(data);
      // let act = JSON.stringify(data)
      // console.log(act);

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      // if (!thatCV.reference) {
      //   thatCV.reference = [req.body]
      // } else {
      thatCV.reference = data;
      // }

      await CV.updateOne(thatCV.id).set({ reference: thatCV.reference })

      return res.view('talent/createContent', { cv: thatCV });
    }

  },

  updateTemplate: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.notFound();

      return res.view('talent/createContent', { cv: thatCV });

    } else {

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.view('talent/createContent', { cv: updatedCV });
    }
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

  viewCV: async function (req, res) {
    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.status(404).json("CV not found.");

    return res.view('template/template-' + thatCV.template, { cv: thatCV, edus: thatCV.education, works: thatCV.work, activities: thatCV.activity, skills: thatCV.skill, refs: thatCV.reference });


  },

  /////preview
  previewDark: async function (req, res) {
    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.status(404).json("CV not found.");

    return res.view('template/template-dark', { layout: false, cv: thatCV, edus: thatCV.education, works: thatCV.work, activities: thatCV.activity, skills: thatCV.skill, refs: thatCV.reference });

  },

  previewWhite: async function (req, res) {
    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.status(404).json("CV not found.");

    return res.view('template/template-white', { cv: thatCV, edus: thatCV.education, works: thatCV.work, activities: thatCV.activity, skills: thatCV.skill, refs: thatCV.reference });

  },


};

