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

            return res.res.status(401).json('User not found');
        }

        var match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {

            return res.status(401).json('Wrong password');
        }
        console.log('THere');
        //reuse existing session
        // if (!req.session.email) {
        //     console.log("Enter")
        //     req.session.username = user.username;
        //     req.session.userid = user.id;
        //     req.session.role = user.role;

        //     return res.json(user);
        // }
        //start a new session for the new login suer
        console.log('Here');
        req.session.regenerate(function (err) {
            console.log("create session");
            if (err) return res.serverError(err);
            req.session.email = user.email;
            req.session.username = user.username;
            req.session.userid = user.id;
            req.session.role = user.role;

            if (req.session.role == 'admin') {
                return res.redirect('/tips');
            } else {

                return res.redirect('/tips');

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
        if (typeof (findUser) != 'undefined') {
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


};

