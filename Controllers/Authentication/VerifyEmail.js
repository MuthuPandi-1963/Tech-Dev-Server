import WelcomePage from "../../Helpers/Html/Welcome.js"
import UserModel from "../../Models/UserModels.js"
import GenerateOTP from "../../Utilities/GenerateOTP.js"
import { EncryptPassword } from "../../Utilities/HashPassword.js"
import { CreateToken } from "../../Utilities/JsonWenToken.js"
import transporter from "../../Utilities/NodeMailer.js"
import SendCookie from "../../Utilities/SendCookie.js"

const VerifyEmail = async(req,res)=>{
    try{
        const { email } = req.body
        if(!email){
            return res.status(400).json({
                success : false,
                message : "email is Required",
                data : null
            })
        }
        const verifyUser = await UserModel.findOne({email})
        if(!verifyUser){
            return res.status(401).json({
                success : false,
                message : "Email is doesn't Exists",
                data : null
            })
        }else if(verifyUser && !verifyUser.isVerified){
            return res.status(401).json({
                success : false,
                message : "Please Signup first",
                data : null
            })
        }
        const OTP = GenerateOTP()
        const token = CreateToken(verifyUser.authId)
        SendCookie(res,token)
        
        const UpdateUser = await UserModel.findByIdAndUpdate(verifyUser._id,{
            VerificationOTP:OTP,
            VerificationOTPExpiresAt : Date.now() + 15 * 60 * 1000
        },{new:true})
        console.log(token);
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL, // sender address
            to:email, // list of receivers
            subject:" Welcome To Gadgets Heaven", // Subject line
            text: "Thanks for Joining us", // plain text body
            html: WelcomePage(UpdateUser.username,email,OTP), // html body
          });
        res.status(200).json({
            success:true,
            message : "OTP send successfully",
            data : {
                email,
                OTP,
                token
            }
        })

    }catch(err){
        res.status(500).json({
            success :false,
            message : `verifyEmail failed  ${err.message}`,
            data :null
        })
    }
}

export default VerifyEmail;