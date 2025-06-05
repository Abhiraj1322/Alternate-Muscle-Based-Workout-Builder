const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const userschema= new mongoose.Schema({
name:{
    type:String,
  required:true
},
email:{
type:String,
required:true,
unique:true,

},
pasword:{
    type:String,
    required:true,
    minlength:6,
},
isAdmin:{
type:Boolean,
default:false,
},

})
userschema.pre('save',async function(next){
if(!this.isModified('password')) return next();
try{
const salt=await bcrypt.genSalt(10);
this.pasword=await bcrypt.hash(this.pasword,salt);
next();
}})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
module.exports=mongoose.model('user',userSchema)

