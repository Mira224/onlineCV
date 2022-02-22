module.exports = async function (req, res, proceed) {
    if (req.session.user) {
      return proceed();
    }
    if (req.wantsJSON){
      res.status(401);
      return res.json('Please login first');
    }
    return res.redirect('/user/login?r='+encodeURIComponent(req.url));
  };
  