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
      console.log(data);
    });
    console.log(req);
  },
  
  getOneBocks: function (req, res, next) {
    Bocks.findOne({
      _id: req.body.id
    }).where({
      $or : [
        {isPrivate: false},
        {userName: req.session.passport.user.username}
      ]
    }).then(function (data) {
      if (data) {
        res.json(data);
      }
      console.log(data);
    });
    console.log(req);
  },
  
  changeBocks: function (req, res, next) {
    Bocks.update({
      _id: req.body.id,
      userName: req.session.passport.user.username
    }, {      
      title: req.body.title,
      text: req.body.text,
      isPrivate: req.body.isPrivate,
      modifiedAt: Date.now()
    }).then(function (data) {
      if (data) {
        res.json(data);
      }
      console.log(data);
    });
    console.log(req);
  },
  
  remBocks: function (req, res, next) {
    Bocks.remove({
      _id: req.body.id
    }).where({
      userName: req.session.passport.user.username
    }).then(function (data) {
      if (data) {
        res.json(data);
      }
      console.log(data);
    });
    console.log(req);
  }
};