var Bocks = require('./bocksModel.js');

module.exports = {
  
  newBocks: function (req, res, next) {
    Bocks.create({
      userName: req.body.userName,
      title: req.body.title,
      text: req.body.text,
      isPrivate: req.body.isPrivate
    })
    .then(function (data) {
      if (data) {
        res.json(data);
      }
      console.log(data);
    });
    console.log(req);
    // .fail(function (err) {
    //   next(err);
    // });
  },
  
  getAllUserBocks: function (req, res, next) {
    Bocks.find({
      userName: req.body.userName
    }).where({
      $or : [
        {isPrivate: false},
        {userName: req.session.passport.user.username}
      ]
    }).then(function (data) {
      if (data) {
          res.json(data);
      }
    }).fail(function (err) {
      next(err);
    });
  },
  
  getOneBocks: function (req, res, next) {
    Bocks.findOne({
      _id: req.body.id
    }).then(function (data) {
      if (data) {
        if (!data.isPrivate || data.userName === req.session.passport.user.username) {
          res.json(data);
        } else {
          res.status(401);
        }
      }
    }).fail(function (err) {
      next(err);
    });
  },
  
  changeBocks: function (req, res, next) {
    Bocks.update({
      _id: req.body.id
    }).then(function (data) {
      // TODO: filter for access
      // TODO: inform user of successful removal
    }).fail(function (err) {
      next(err);
    })    
  },
  
  remBocks: function (req, res, next) {
    Bocks.remove({
      _id: req.body.id
    }).then(function (data) {
      // TODO: filter for access
      // TODO: inform user of successful removal
    }).fail(function (err) {
      next(err);
    })
  }
}