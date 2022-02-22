/**
 * EduController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function (req, res) {

        if (req.method == "GET") return res.view('talent/createEdu');
    
        var edu = await Edu.create(req.body).fetch();
    
        return res.status(201).json({ id: edu.id });
      },
    
      update: async function (req, res) {
    
        if (req.method == "GET") {
    
          var thatEdu = await Edu.findOne(req.params.id);
    
          if (!thatActivity) return res.notFound();
    
          return res.view('talent/updateEdu', { edu: thatEdu });
    
        } else {
    
          var updatedEdu = await Edu.updateOne(req.params.id).set(req.body);
    
          if (!updatedEdu) return res.notFound();
    
          return res.ok();
        }
      },
};

