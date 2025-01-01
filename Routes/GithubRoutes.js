import passport from 'passport';
import { Router } from 'express';
import SendCookie from '../Utilities/SendCookie.js';
import { CreateToken } from '../Utilities/JsonWenToken.js';

const GitHubRoutes = Router();
const appLocalUrl = process.env.FRONT_END_URL_LOCAL;
const appGlobalUrl = process.env.FRONT_END_URL_GLOBAL;
const environment = process.env.NODE_ENV;

const URL = environment === "production" ? appGlobalUrl : appLocalUrl;
// Route for GitHub OAuth
GitHubRoutes.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"], // You can request more scopes if needed
  })
);

// Route for GitHub OAuth Callback
GitHubRoutes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: URL,
  }),
  (req, res) => {
    // Send the user data and message to the frontend
    
    req.session.user = req.user;
    console.log("GitHub User: ", req.user);

    // Create a JWT token for the user
    const token = CreateToken(req.user.id);

    // Send the token as a cookie
    SendCookie(res, token);

    // Redirect to your frontend (React) app
    res.redirect("https://gadgets-heaven-1.onrender.com/");
  }
);

// Route to get user info (optional)
GitHubRoutes.get("/user", (req, res) => {
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

export default GitHubRoutes;
