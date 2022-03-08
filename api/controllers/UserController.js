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

    overview: async function (req, res) {
        if (req.method == "GET") return res.view('pages/allcv');

        var user = await User.findOne(req.session.id);

        if (!user) return res.notFound();

        var cvs = await User.find({ id: req.session.id }).populate("userOwnCV");

        return res.view('pages/allcv', { cvs: cvs, user: user })
    },

    listUser: async function (req, res){

        var users = await User.find()

        return res.view('admin/alluser', { users: users });

    }

};

