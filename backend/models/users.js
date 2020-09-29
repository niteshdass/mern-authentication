const mongoose = require('mongoose');
const crypto = require('crypto')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const userSchema = new Schema({
  username:{
        type:String,
        trim:true,
        required:true,
        max:32,
        index:true,
        unique:true,
        lowercase:true

  },
 name:{
      type:String,
      trim:true,
      required:true,
      max:32,
    

},
 email:{
      type:String,
      trim:true,
      required:true,
      max:32,
      unique:true,

},
profile:{
      type:String,
      required:true
},
hashed_password:{
      type:String,
      require:true
},salt:{
      type:String,
},about:{
      type:String
},role:{
      type:Number,
      default:0
},photo:{
      data:Buffer,
      contentType:String
},resetPasswordLink:{
      type:String,
      default:''

}

},{timestamps:true});

userSchema.virtual('password')
      .set(function(password){
            this._password = password
            this.salt = this.makeSalt()
            this.hashed_password = this.encryptPassword(password)
      })
      .get(function(password){
            return this._password
      })

userSchema.methods = {
      authenticate:function(plainText){
            return this.encryptPassword(plainText) === this.hashed_password;
      },
      encryptPassword:function(password){
            if(!password) return '';
            try{
                  return crypto
                        .createHmac('sha1',this.salt)
                        .update(password)
                        .digest('hex');
            }catch(err){
                  return '';
            }
      },
      makeSalt:function(){
            return Math.round(new Date().valueOf() * Math.random())+ '';
      }
}


module.exports = mongoose.model("User",userSchema)