// backend/routes/authRoutes.js
import passport from 'passport';
import { Router } from 'express';
import SendCookie from '../Utilities/SendCookie.js';
import { CreateToken } from '../Utilities/JsonWenToken.js';
const GoogleRoutes = Router();
const appLocalUrl = process.env.FRONT_END_URL_LOCAL;
const appGlobalUrl = process.env.FRONT_END_URL_GLOBAL;
const environment = process.env.NODE_ENV;

const URL = environment === "production" ? appGlobalUrl : appLocalUrl;

// Route for Google OAuth
GoogleRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Route for Google OAuth Callback
GoogleRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:URL,
  }),
  (req, res) => {
    // Send the user data and message to the frontend
    
    req.session.user = req.user;
    console.log("its user ",req.user);
    const token = CreateToken(req.user._id)
    SendCookie(res,token)
    res.redirect(URL)
  }
);
GoogleRoutes.get("/user", (req, res) => {
  console.log(req.session.user);
  
  if (req.session && req.session.user) {
    res.json({
      user: req.session.user,
      success: true,
    });
  } else {
    res.json({
      message: "No user found",
      success: false,
    });
  }
});
export default GoogleRoutes;
