import UserModel from "../../Models/UserModels.js";
import { EncryptPassword } from "../../Utilities/HashPassword.js"; // Ensure EncryptPassword is imported
import { CreateToken, VerifyToken } from "../../Utilities/JsonWenToken.js";
import SendCookie from "../../Utilities/SendCookie.js";

const ResetPassword = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            data: null,
        });
    }

    const token = req.cookies.token;

    // Check if token is present
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing",
            data: null,
        });
    }

    const confirmedToken = VerifyToken(token);

    // Verify token validity
    if (!confirmedToken) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            data: null,
        });
    }

    try {
        // Check if user exists
        const ValidUser = await UserModel.findOneAndUpdate({ email },{
            isLoggedIn:true
        },{new:true});
        if (!ValidUser) {
            return res.status(404).json({
                success: false,
                message: "Email does not exist",
                data: null,
            });
        }

        // Hash the new password
        const HashedPassword =await EncryptPassword(password);
        // Update password in the database
        await UserModel.findByIdAndUpdate(
            ValidUser._id,
            { password: HashedPassword },
            { new: true }
        );

        // Generate a new token
        const newToken = CreateToken(ValidUser.authId);

        // Send the new token as a cookie
        SendCookie(res, newToken);

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            data: {
                id: ValidUser._id,
                email: ValidUser.email,
                username: ValidUser.username,
                role: ValidUser.role,
                isVerified: ValidUser.isVerified,
            },
        });
    } catch (err) {
        // Handle server errors
        console.log(err);
        
        res.status(500).json({
            success: false,
            message: `Password change failed: ${err.message}`,
            data: null,
        });
    }
};

export default ResetPassword;
