import WelcomePage from "../../Helpers/Html/Welcome.js"
import UserModel from "../../Models/UserModels.js"
import GenerateOTP from "../../Utilities/GenerateOTP.js"
import { EncryptPassword } from "../../Utilities/HashPassword.js"
import { CreateToken } from "../../Utilities/JsonWenToken.js"
import transporter from "../../Utilities/NodeMailer.js"
import SendCookie from "../../Utilities/SendCookie.js"
import ExistingUser from "./ExistingUser.js"


const Register = async (req,res)=>{
    const {username ,  email , password } = req.body

    if(!username || !email || !password ){
        return res.status(404).json({
            success : false,
            error :true,
            message : "All fields are Required",
            data : null
        })
    }
    try{
        const CheckUser = await UserModel.findOne({email})
        if(CheckUser && CheckUser.isVerified){
            return res.status(401).json({
                success : false,
                error :true,
                message : "Email is Already Exists",
                data : null
            })
        }else if (CheckUser && !CheckUser.isVerified){
            return ExistingUser(res,email,password,username,CheckUser.authId)
        }
        const OTP = GenerateOTP()
        const HashedPassword =await EncryptPassword(password)
        const newUser = await UserModel.create({
            email,
            username,
            password : HashedPassword,
            VerificationOTP : OTP,
            VerificationOTPExpiresAt  : Date.now() + 0.25 * 60 * 60 * 1000,
            
        })
        const token =  CreateToken(newUser.authId)
        SendCookie(res,token)
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL, // sender address
            to:email, // list of receivers
            subject:" Welcome To Gadgets Heaven", // Subject line
            text: "Thanks for Joining us", // plain text body
            html: WelcomePage(username,email,OTP), // html body
          });
        console.log(token);
        res.status(200).json({
            success : true , 
            message : "OTP sent successfully" ,
            data :{
                id  : newUser.authId,
                email : newUser.email,
                username : newUser.username,
                role : newUser.role,
                isVerified : newUser.isVerified,
                isLoggedIn : newUser.isLoggedIn,
                otp : OTP,
                token :token
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error :true,
            success :false,
            message : "Registration failed " + err.message,
            data :null
        })
        
    }
}   

export default Register;