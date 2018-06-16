var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function(error, results) {
    if (error) {
      return next(error);
    }

    // 유효한 데이터로 응답한다
    res.json(results);
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  Employee.findOne({
    id: req.params.employeeId
  }).populate('team').exec(function (error, results) {
    if (error) {
      return next(error);
    }

    // 유효한 사용자를 찾지 못하면 404를 전송한다
    if (!results) {
      res.send(404);
    }

    // 유효한 데이터로 응답한다
    res.json(results);
  });
});

router.put('/employees/:employeeId', function (req, res, next) {
  // 다음 행을 제거하면 몽구스가 오류를 던진다
  // 몽고DB ID를 갱신하려 시도하기 때문이다
  delete req.body._id;
  req.body.team = req.body.team._id;

  Employee.update({
    id: req.params.employeeId
  }, req.body, function (err, numberAffected, response) {
    if (err) {
      return next(err);
    }

    res.send(200);
  });
});

module.exports = router;
