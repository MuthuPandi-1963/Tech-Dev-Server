import express from 'express'
import Register from '../Controllers/Authentication/Register.js'
import Login from '../Controllers/Authentication/Login.js'
import Logout from '../Controllers/Authentication/Logout.js'
import verifyOTP from '../Controllers/Authentication/VerifyOTP.js'
import VerifyEmail from '../Controllers/Authentication/VerifyEmail.js'
import ResetPassword from '../Controllers/Authentication/ResetPassword.js'
import ResendOTP from '../Controllers/Authentication/ResendOTP.js'
import RefreshAuth from '../Controllers/Authentication/RefreshAuth.js'
import ResetPasswordOTP from '../Controllers/Authentication/ResetPasswordOTP.js'

const authRouter = express.Router()

authRouter.post('/register',Register)
authRouter.post('/login',Login)
authRouter.get('/logout',Logout)
authRouter.post('/verify_otp',verifyOTP)
authRouter.post('/verify_reset_password_otp',ResetPasswordOTP)
authRouter.post('/verify_email',VerifyEmail)
authRouter.post('/reset_password',ResetPassword)
authRouter.post('/resend_otp',ResendOTP)
authRouter.get('/get_user',RefreshAuth)

export default authRouter;