import WelcomePage from "../../Helpers/Html/Welcome.js"
import UserModel from "../../Models/UserModels.js"
import GenerateOTP from "../../Utilities/GenerateOTP.js"
import { EncryptPassword } from "../../Utilities/HashPassword.js"
import { CreateToken } from "../../Utilities/JsonWenToken.js"
import transporter from "../../Utilities/NodeMailer.js"
import SendCookie from "../../Utilities/SendCookie.js"

const ExistingUser = async(res,email,password,username,id)=>{
    const OTP = GenerateOTP()
        const HashedPassword = await EncryptPassword(password)
        const token = CreateToken(id)
        SendCookie(res,token)
        const UpdatedUser = await UserModel.findByIdAndUpdate(id,{
            username : username,
            password : HashedPassword,
            VerificationOTP : OTP,
            VerificationOTPExpiresAt  : Date.now() + 15 * 60 * 1000,
        },{new:true})
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
                id  : UpdatedUser.authId,
                email : UpdatedUser.email,
                username : UpdatedUser.username,
                role : UpdatedUser.role,
                isVerified : UpdatedUser.isVerified,
                otp : OTP,
                token
            }
        })
}

export default ExistingUser;