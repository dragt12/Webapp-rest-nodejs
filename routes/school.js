var express = require('express');
var router = express.Router();
var School=require('../models/school');
var userCodes=require('../models/user_codes');
var randomstring=require('randomstring');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send();
});
router.get('/school_generate/:school', function(req,res,next){
  var school_key=randomstring.generate(10);
  var school_pass=randomstring.generate(5);
  var new_school=new School();
  new_school.school_name=req.params.school;
  new_school.school_key=school_key;
  new_school.school_pass=school_pass;
  new_school.save(function(err,result){
    if(!err){
      res.json({"school_key":school_key, "school_pass":school_pass});
    }
  })
});
router.get('/teacher_generate/:school_key/:teachers', function(req,res,next){
  var school=req.params.school_key;
  var teachers = JSON.parse(req.params.teachers);
  console.log(teachers)
  var returnArray=[];
  School.findOne({school_key:school}, function(err,result){
    console.log(result);
    if(!result.length){
      teachers.forEach(function(element) {
        var keyCode=randomstring.generate(10);
        var keyPass=randomstring.generate(5)
        var teacher_code=new userCodes();
        teacher_code.name=element;
        teacher_code.key_code=keyCode;
        teacher_code.key_pass=keyPass;
        teacher_code.school=school;
        teacher_code.key_type='teacher';
        teacher_code.save();
        returnArray.push({'teacher_name': element, 'key_code':keyCode, 'key_pass': keyPass});
      }, this);
      res.send(returnArray);
    } else {
      res.status(500);
    }
  })
});
module.exports = router;