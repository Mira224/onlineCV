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

      let data = [req.body];
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

      let data = [req.body];
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

      let data = [req.body];
      if (Array.isArray(req.body.title)) {
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
      thatCV.activity = data || [];
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

      let data = [req.body];
      if (Array.isArray(req.body.content)) {
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

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      req.file('refFile').upload({}, function whenDone(err, uploadedFiles) {
        if (err) {
          return res.serverError(err);
        }

        // uploadedFiles.forEach(file => {
        console.log(uploadedFiles)
        // });
        let data = [req.body];
        if (uploadedFiles.length == 1) {
          data[0].file = uploadedFiles[0].fd
          data[0].filename = uploadedFiles[0].filename
        }
        if (Array.isArray(req.body.reference)) {
          data = req.body.name.map(function (v, i) {
            return {
              name: v,
              relationship: req.body.relationship[i],
              contact: req.body.contact[i],
              comment: req.body.comment[i],
              file: uploadedFiles[i] ? uploadedFiles[i].fd : '',
              filename: uploadedFiles[i] ? uploadedFiles[i].filename : '',
            }
          })
        }
        // console.log(data);
        // let act = JSON.stringify(data)
        // console.log(act);



        // if (!thatCV.reference) {
        //   thatCV.reference = [req.body]
        // } else {
        thatCV.reference = data;
        // }

        CV.updateOne(thatCV.id).set({ reference: thatCV.reference }).then(function () {
          return res.view('talent/create/chooseTemplate', { cv: thatCV });
        })



        // return res.json({
        //   message: uploadedFiles.length + ' file(s) uploaded successfully!'
        // });
      });
      // If no files were uploaded, pass
      // if (uploadedFiles.length === 0){
      //   return res.badRequest('No file was uploaded');
      // }

      // Get the base URL for our deployed application from our custom config
      // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
      //   var baseUrl = sails.config.custom.baseUrl;

      //   // Save the "fd" and the url where the avatar for a user can be accessed
      //   User.update(req.session.userid, {

      //     // Generate a unique URL where the avatar can be downloaded.
      //     refUrl: require('util').format('%s/user/refFile/%s', baseUrl, req.session.userid),

      //     // Grab the first file and use it's `fd` (file descriptor)
      //     refFileFd: uploadedFiles[0].fd
      //   })
      //   .exec(function (err){
      //     if (err) return res.serverError(err);
      //     return res.ok();
      //   });
      // });



    }

  },
  chooseTemplate: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.notFound();

      return res.view('talent/create/chooseTemplate', { cv: thatCV });

    } else {

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");

      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.view('talent/createContent', { cv: updatedCV });
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

      let data = [req.body];
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

      let data = [req.body];
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

      return res.view('talent/update/updateActivity', { cv: thatCV, activities: thatCV.activity || [] });
    } else {

      let data = [req.body];
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

      var thatCV = await CV.findOne(req.params.id);
      if (!thatCV) return res.status(404).json("CV not found.");
      thatCV.activity = data;

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

      let data = [req.body];
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

      var user = await User.findOne(req.session.userid).populate("userOwnCV");

      if (!user) return res.notFound();
      var updatedCV = await CV.updateOne(req.params.id).set(req.body);

      if (!updatedCV) return res.notFound();

      return res.view('pages/allcv', { cv: updatedCV, user: user, cvs: user.userOwnCV });
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

    // return res.ok();
    return res.redirect('/cv/overview');
  },

  changeStatus: async function (req, res) {
    if (req.method == "GET") {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.notFound();
      if (thatCV.status == "private") {
        await CV.updateOne(thatCV.id).set({ status: 'public' })
      } else {
        await CV.updateOne(thatCV.id).set({ status: 'private' })
      }
      return res.redirect('/cv/overview')
      // return res.view('pages/allcv', { cv: thatCV });

    } else {

      var thatCV = await CV.findOne(req.params.id);

      if (!thatCV) return res.notFound();

      if (thatCV.status == "private") {
        await CV.updateOne(thatCV.status).set({ status: 'public' })
      } else {
        await CV.updateOne(thatCV.status).set({ status: 'private' })
      }

      return res.view('pages/allcv', { cv: thatCV });
    }
  },

  downloadRef: async function (req, res) {
    let cv = await CV.findOne(req.params.id);
    if (!cv || !cv.reference[req.params.index]) return res.notFound();

    res.set("Content-disposition", "attachment; filename=" + cv.reference[req.params.index].filename);
    return res.sendFile(cv.reference[req.params.index].file);
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

    return res.view('template/template-white', { layout: false, cv: thatCV, edus: thatCV.education, works: thatCV.work, activities: thatCV.activity, skills: thatCV.skill, refs: thatCV.reference });

  },
  previewBlue: async function (req, res) {
    var thatCV = await CV.findOne(req.params.id);

    if (!thatCV) return res.status(404).json("CV not found.");

    return res.view('template/template-blue', { layout: false, cv: thatCV, edus: thatCV.education, works: thatCV.work, activities: thatCV.activity, skills: thatCV.skill, refs: thatCV.reference });

  },
  viewCV: async function (req, res) {
    var thatCV = await CV.findOne(req.params.id);
    var owner = await CV.findOne(req.params.id).populate("owner");
    console.log(owner.username);

    if (!thatCV) return res.status(404).json("CV not found.");

    // var fileCount = thatCV.reference.length();
    if (thatCV.status == 'private') {
      if (req.session.role != 'admin' || req.session.userid != owner.id)
        return res.forbidden();
    }

    return res.view('template/' + thatCV.template, { layout: false, cv: thatCV, edus: thatCV.education, works: thatCV.work, activities: thatCV.activity, skills: thatCV.skill, refs: thatCV.reference });


  },


};

