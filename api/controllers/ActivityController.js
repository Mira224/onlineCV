/**
 * ActivityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action - create
  create: async function (req, res) {

    if (req.method == "GET") return res.view('talent/createActivity');

    var activity = await Activity.create(req.body).fetch();

    return res.status(201).json({ id: activity.id });
  },

  update: async function (req, res) {

    if (req.method == "GET") {

      var thatActivity = await Activity.findOne(req.params.id);

      if (!thatActivity) return res.notFound();

      return res.view('talent/updateActivity', { activity: thatActivity });

    } else {

      var updatedActivity = await Activity.updateOne(req.params.id).set(req.body);

      if (!updatedActivity) return res.notFound();

      return res.ok();
    }
  },
};

