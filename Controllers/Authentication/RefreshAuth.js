import UserModel from "../../Models/UserModels.js";
import { VerifyToken } from "../../Utilities/JsonWenToken.js";

const RefreshAuth = async (req, res) => {
    try {
        const token = req.cookies?.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
                data: null,
            });
        }

        // Verify the token
        let confirmedToken;
        try {
            confirmedToken = VerifyToken(token);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: `Token verification failed: ${err.message}`,
                data: null,
            });
        }

        // Find the user in the database
        const user = await UserModel.findById({ _id: confirmedToken.id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }

        // Check if the user is logged in
        if (!user.isLoggedIn) {
            return res.status(401).json({
                success: false,
                message: "User is not logged in",
                data: null,
            });
        }

        // Send success response with user details
        return res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            data: {
                email: user.email,
                id: user._id,
                isVerified: user.isVerified,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`,
            data: null,
        });
    }
};

export default RefreshAuth;
