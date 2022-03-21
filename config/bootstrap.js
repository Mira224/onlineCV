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
module.exports.bootstrap = async function () {



  if (await User.count() == 0) {
    await User.createEach([
      { username: 'admin1', password: await bcrypt.hash('a12345678', 10), role: 'admin', mobile: "123456", status: 1, email: 'admin1@onlineCV.com' },
      { username: 'admin2', password: await bcrypt.hash('a12345678', 10), role: 'admin', mobile: "123456", status: 1, email: 'admin2@onlineCV.com' },
      { username: 'user1', password: await bcrypt.hash('u12345678', 10), role: 'talent', mobile: "123456", status: 1, email: 'user1@onlineCV.com' },
      { username: 'user2', password: await bcrypt.hash('u12345678', 10), role: 'talent', mobile: "123456", status: 1, email: 'user2@onlineCV.com' },
    ]);
  }

  if (await CV.count() == 0) {
    await CV.createEach([
      {
        title: "Adam's CV", link: '', ps: "I am a front worker.", template: 'template-dark', tel: '12345678', fax: '12345678', education: [
          { school: 'High school', sTime: new Date('2012-09-01'), eTime: new Date('2015-6-30'), description: 'I did well in high school.' },
          { school: 'University', sTime: new Date('2015-09-01'), eTime: new Date('2019-7-31'), description: 'GPA:3.4' },],
        work: [{
          org: "Company A", position: 'Manager', sTime: new Date("2020-03-19"), eTime: new Date('2022-02-05'),
          description: 'I helped the company to improve office processes that increaseds work efficiency by 50%.',
        }],
        skill: [{ content: 'English', level: 'Native' }, { content: "Office software", level: 'Professional' }, { content: "python", level: "proficient" }],
        project: [{ title: 'Volunteer teacher', sTime: new Date('2018-09-01'), eTime: new Date('2018-10-31'), description: "I spent four months in the country." }, { title: 'Online python work', description: "I joined a team to analyze the affect of drinking for young." }],
        activity: [{ title: 'Competition', sTime: new Date('2018-09-01'), eTime: new Date('2018-10-31'), description: "I was the winner." }],
        reference: [{ name: "Cathy Wong", relationship: 'Supervisor', comment: "Adam is a good worker, it is nice to have him with us.", contact: "1783583298" }]
      },]
    );
    // let cv1 = await CV.findOne({title:"Adam's CV"})
    // let user1 = await User.findOne({username:'user1'})
    // await CV.addToCollection(cv1.id, 'owner').members(user1.id)
  }






};
