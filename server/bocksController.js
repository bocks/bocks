var Bocks = require('./bocksModel.js');

module.exports = {

  newBocks: function (req, res, next) {
    console.log('REQ', req.body);

    Bocks.create({
      userName: req.session.passport.user.username,
      title: req.body.title,
      code: req.body.code,
      highlights: req.body.highlights,
      isPrivate: !!req.body.isPrivate
    })
    .then(function (data) {
      console.log('DATA', data);

      if (data) {
        res.json(data);
      }
    });
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
    });
  },

  getOneBocks: function (req, res, next) {
    Bocks.findOne({
      _id: req.params.id
    }).where({
      $or : [
        {isPrivate: false},
        {userName: req.session.passport.user.username}
      ]
    }).then(function (data) {
      if (data) {
        res.json(data);
      }
    });
  },

  changeBocks: function (req, res, next) {
    Bocks.update({
      _id: req.params.id,
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
    });
  },

  remBocks: function (req, res, next) {
    Bocks.remove({
      _id: req.params.id
    }).where({
      userName: req.session.passport.user.username
    }).then(function (data) {
      if (data) {
        res.json(data);
      }
    });
  }
};
