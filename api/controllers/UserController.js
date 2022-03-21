/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs');
module.exports = {
    login: async function (req, res) {
        if (req.method == 'GET') { return res.view('pages/login'); }

        if (!req.body.email || !req.body.password) { return res.badRequest(); }


        var user = await User.findOne({ email: req.body.email });
        // console.log(user);
        // console.log(req.body.password);

        if (!user) {
            return res.status(401).json('User not found');
        }

        var match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {

            return res.status(401).json('Wrong password');
        }

        req.session.regenerate(function (err) {
            console.log("create session");
            if (err) return res.serverError(err);
            req.session.email = user.email;
            req.session.username = user.username;
            req.session.userid = user.id;
            req.session.role = user.role;

            if (req.session.role == 'admin') {
                return res.json(req.session)
                // return res.redirect('/tips');
            } else {
                return res.json(req.session)
                // return res.redirect('/tips');
            };

        });


    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/user");

        });
    },

    register: async function (req, res) {
        if (req.method == "GET") return res.view('pages/register');

        let findUser = await User.find({ email: req.body.email });
        if (findUser.length > 0) {
            console.log(findUser)
            return res.status(409).json("Email already registered");
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body).fetch();
        if (user) {
            req.session.user = user;
            return res.redirect('/user/login');
        }
        return res.badRequest(error.message);

    },

    deleteUser: async function (req, res) {
        var deletedUser = await User.destroyOne(req.params.id);

        if (!deletedUser) return res.notFound();

        return res.staus(200).redirect('/admin/searchuser')
    },

    changePassword: async function (req, res) {
        if (req.method == "GET") {

            var thatUser = await CV.findOne(req.params.id);
      
      
            if (!thatUser) return res.status(404).json("User not found.");
      
            return res.view('admin/changePassword', { user: thatUser});
          } else {

        var thatUser = await User.findOne(req.params.id);

        if (!thatUser) return res.notFound();

        var password = await bcrypt.hash(req.body.password, 10);

        await User.updateOne(thatUser.id).set({ password: password})

        return res.ok();
          }

    },


    searchUser: async function (req, res) {

        var whereClause = {};

        if (req.query.username) whereClause.username = { contains: req.query.username };

        // var email = parseInt(req.query.email);
        if (req.query.email) whereClause.email = email;

        if (req.wantsJSON) {
            var limit = Math.max(req.query.limit, 2) || 2;
            var offset = Math.max(req.query.offset, 0) || 0;

            var thoseUsers = await User.find({
                where: whereClause,
                sort: 'email'
            });

            var count = await User.find({
                where: whereClause,
                limit: limit,
                skip: offset,
            });
            return res.json({ thoseUsers, count });


        } else {

            var thoseUsers = await User.find({
                where: whereClause,
                sort: 'email'
            });
            var count = await User.find({
                where: whereClause,
            });

            let allusers = await User.find()

            return res.view('admin/searchuser', { users: thoseUsers, allusers: allusers, count: count });

        }


    },
    paginate: async function (req, res) {

        var limit = Math.max(req.query.limit, 2) || 2;
        var offset = Math.max(req.query.offset, 0) || 0;

        var someUsers = await User.find({
            limit: limit,
            skip: offset
        });

        var count = await Person.count();

        return res.view('admin/userpage', { users: someUsers, numOfRecords: count });
    },

};

