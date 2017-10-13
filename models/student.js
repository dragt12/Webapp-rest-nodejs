var mongoose=require('mongoose');
var schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var student=new schema({
    name:{type:String, required:false},
    email:{type:String, required:true},
    password:{type:String, required:true},
    school:{type:String, required:false},
    class:{type:String, required:false},
    points:{type:Number, required:false, default:0}
});
student.methods.encryptPassword = function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
student.methods.validPassword=function(password)
{
	return bcrypt.compareSync(password, this.password);
}
module.exports=mongoose.model('Student', student);