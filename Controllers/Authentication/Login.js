import UserModel from "../../Models/UserModels.js";
import { VerifyPassword } from "../../Utilities/HashPassword.js";
import { CreateToken } from "../../Utilities/JsonWenToken.js";
import SendCookie from "../../Utilities/SendCookie.js";

const Login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            data: null,
        });
    }

    try {
        const ValidUser = await UserModel.findOne({ email });
        if (!ValidUser) {
            return res.status(401).json({
                success: false,
                message: "Email doesn't exist",
                data: null,
            });
        }

        if (!ValidUser.isVerified) {
            if (ValidUser.authType !== "Normal") {
                return res.status(404).json({
                    success: false,
                    message: `Please log in using ${ValidUser.authType}`,
                    data: null,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Sign up and verify your email first",
                    data: null,
                });
            }
        }

        if (ValidUser.authType !== "Normal") {
            return res.status(400).json({
                success: false,
                message: `This account  already logged with ${ValidUser.authType}. please login with ${ValidUser.authType} account.`,
                data: null,
            });
        }

        const isPasswordValid = await VerifyPassword(password, ValidUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid or wrong password",
                data: null,
            });
        }

        ValidUser.isLoggedIn = true;
        await ValidUser.save();
        const token = await CreateToken(ValidUser.authId);
        SendCookie(res, token);
        console.log(token);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                id: ValidUser._id,
                email: ValidUser.email,
                username: ValidUser.username,
                role: ValidUser.role,
                isVerified: ValidUser.isVerified,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: `Login failed: ${err.message}`,
            data: null,
        });
    }
};

export default Login;
