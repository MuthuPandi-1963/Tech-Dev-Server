import UserModel from "../../Models/UserModels.js";
import { VerifyToken } from "../../Utilities/JsonWenToken.js";
const ResetPasswordOTP = async (req, res) => {
    try {
        const token = req.cookies?.token;
        console.log("token is missing " ,token);
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
                data: null,
            });
        }

        const confirmedToken = VerifyToken(token);

        if (!confirmedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                data: null,
            });
        }

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
                data: null,
            });
        }

        const validUser = await UserModel.findOne({ email });

        if (!validUser) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist",
                data: null,
            });
        }

        if (!validUser.VerificationOTP || !validUser.VerificationOTPExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "OTP verification fields are missing for the user",
                data: null,
            });
        }

        if (validUser.VerificationOTP !== otp.toString()) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP",
                data: null,
            });
        }

        if (validUser.VerificationOTPExpiresAt <= Date.now()) {
            return res.status(401).json({
                success: false,
                message: "OTP has expired",
                data: null,
            });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(validUser._id,{
            isVerified:true,
            VerificationOTP:"",
            VerificationOTPExpiresAt:Date.now(),
        })
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            data: {
                id  : updatedUser.authId,
                email : updatedUser.email,
                // username : updatedUser.username,
                // role : updatedUser.role,
                // isVerified : updatedUser.isVerified,
            },
        });
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            success: false,
            message: `Verification failed: ${err.message}`,
            data: null,
        });
    }
};

export default ResetPasswordOTP;
