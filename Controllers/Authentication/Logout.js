import UserModel from "../../Models/UserModels.js";
import { VerifyToken } from "../../Utilities/JsonWenToken.js";

const Logout = async (req, res) => {
    try {
        const token = req.cookies?.token;
        const connect = req.cookie?.connect.sid

        // Check if token is present
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
                data: null,
            });
        }
        console.log(connect);
        
        // Verify the token
        let ConfirmToken;
        try {
            ConfirmToken = VerifyToken(token);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                data: null,
            });
        }

        // Find and update the user
        const user = await UserModel.findByIdAndUpdate(
            { _id: ConfirmToken.id },
            { isLoggedIn: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }
        if(connect){
            res.clearCookie('connect.sid', { path: '/' });
        }
        // Clear the authentication cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successfully",
            data: null,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Logout failed: ${err.message}`,
            data: null,
        });
    }
};

export default Logout;
