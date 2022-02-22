/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
 const bcrypt = require('bcryptjs');
module.exports.bootstrap = async function() {

 

 if (await User.count() > 0) {
    return;
   }
  
  await User.createEach([
    { username: 'admin1', password: await bcrypt.hash('a12345678', 10), role: 'admin', mobile: "123456", status: 'active', email: 'admin1@onlineCV.com' },
    { username: 'admin2', password: await bcrypt.hash('a12345678', 10), role: 'admin', mobile: "123456", status: 'active', email: 'admin2@onlineCV.com' },
    { username: 'user1', password: await bcrypt.hash('u12345678', 10), role: 'talent', mobile: "123456", status: 'active', email: 'user1@onlineCV.com' },
    { username: 'user2', password: await bcrypt.hash('u12345678', 10), role: 'talent', mobile: "123456", status: 'active', email: 'user2@onlineCV.com' },
  ]);


  

};
