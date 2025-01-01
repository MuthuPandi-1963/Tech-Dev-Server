import UserModel from "../../Models/UserModels.js"; // Replace with your actual email service
import transporter from "../../Utilities/NodeMailer.js";

const ResendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
                data: null,
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist",
                data: null,
            });
        }

        // Generate a new OTP
        const newOTP = generateOTP();
        const otpExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 5 minutes

        // Update the user document with the new OTP and expiration time
        user.VerificationOTP = newOTP;
        user.VerificationOTPExpiresAt = otpExpiry;
        await user.save();

        // Send the OTP to the user's email
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL, // sender address
            to:email, // list of receivers
            subject:"Verify Your Account", // Subject line
            text: "Thanks for Joining us", // plain text body
            html: WelcomePage(user.username,email,newOTP), // html body
          });

        if (!emailSent) {
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully",
            data: {
                email: user.email,
                otpSent: true,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Failed to resend OTP: ${err.message}`,
            data: null,
        });
    }
};

export default ResendOTP;
