import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    authType:{
        type : String,
        enum : [ "Google", "Github" , "Normal"],
        default : "Normal"
    },
    authId : {
        type :String,
    },
    username : {
        type  : String ,
        required : true ,
    },
    email : {
        type: String ,
        required :true,
        unique :true,
    },
    password : {
        type :String ,
    },
    isVerified : {
        type: Boolean ,
        default :false
    },
    VerificationOTP :{
        type : String,
        default :""
    },
    VerificationOTPExpiresAt : {
        type :Date ,
        default :()=>Date.now()
    },
    role :{
        type :String,
        enum : ["user","admin"],
        default :"user"
    },
    ResetPasswordOTP : {
        type :Boolean ,
        default :false,
    },
    ResetPasswordOTPExpiresAt:{
        type : Date,
        default:()=>Date.now()
    },
    isLoggedIn :{
        type:Boolean,
        default:false
    }

},{timestamps:true})

UserSchema.pre('save',function (next){
    if(!this.authId){
        this.authId = this._id.toString()
    }
    next()
})
const UserModel = mongoose.model("user",UserSchema);

export default UserModel;