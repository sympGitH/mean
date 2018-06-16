var express = require('express');
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/teams', function (req, res, next) {
  Team.find().sort('name').exec(function (error, results) {
    if (error) {
      return next(error);
    }

    //유효한 데이터로 응답한다
    res.json(results);
  });
});

router.get('/teams/:teamId', function (req, res, next) {
  Team.findOne({
    _id: req.params.teamId
  }, function (error, results) {
    if (error) {
      return next(error);
    }

    res.json(results);
  });
});

module.exports = router;
