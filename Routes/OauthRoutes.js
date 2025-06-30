// routes/OauthRoutes.js
import passport from 'passport';
import { Router } from 'express';
import SendCookie from '../Utilities/SendCookie.js';
import { CreateToken } from '../Utilities/JsonWenToken.js';

const GoogleRoutes = Router();
const appLocalUrl = process.env.FRONT_END_URL_LOCAL;
const appGlobalUrl = process.env.FRONT_END_URL_GLOBAL;
const environment = process.env.NODE_ENV;

const URL = environment === "production" ? appGlobalUrl : appLocalUrl;

// 👉 Route to start Google login
GoogleRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 👉 Google OAuth Callback
GoogleRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: URL,
  }),
  async (req, res) => {
    try {
      if (!req.user) throw new Error("User not found in callback");

      req.session.user = req.user;
      console.log("Google User: ", req.user);

      const token = CreateToken(req.user._id);
      SendCookie(res, token);

      res.redirect(URL);
    } catch (err) {
      console.error("Google Auth Error:", err);
      res.redirect(`${URL}?auth=fail`);
    }
  }
);

// 👉 Get current user (optional)
GoogleRoutes.get("/user", (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ user: req.session.user, success: true });
  }
  res.json({ message: "No user found", success: false });
});

// 👉 Logout
GoogleRoutes.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie("token");
    res.redirect(URL);
  });
});

export default GoogleRoutes;
