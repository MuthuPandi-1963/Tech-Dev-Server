// routes/GithubRoutes.js
import passport from 'passport';
import { Router } from 'express';
import SendCookie from '../Utilities/SendCookie.js';
import { CreateToken } from '../Utilities/JsonWenToken.js';

const GitHubRoutes = Router();
const appLocalUrl = process.env.FRONT_END_URL_LOCAL;
const appGlobalUrl = process.env.FRONT_END_URL_GLOBAL;
const environment = process.env.NODE_ENV;

const URL = environment === "production" ? appGlobalUrl : appLocalUrl;

// 👉 Route to start GitHub login
GitHubRoutes.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"], // Optional: ["user:email", "read:user"]
  })
);

// 👉 GitHub OAuth Callback
GitHubRoutes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: URL,
  }),
  async (req, res) => {
    try {
      if (!req.user) throw new Error("User not found in GitHub callback");

      req.session.user = req.user;
      console.log("GitHub User: ", req.user);

      const token = CreateToken(req.user._id);
      SendCookie(res, token);

      res.redirect(URL);
    } catch (err) {
      console.error("GitHub Auth Error:", err);
      res.redirect(`${URL}?auth=fail`);
    }
  }
);

// 👉 Get current user (optional)
GitHubRoutes.get("/user", (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ user: req.session.user, success: true });
  }
  res.json({ message: "No user found", success: false });
});

// 👉 Logout
GitHubRoutes.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie("token");
    res.redirect(URL);
  });
});

export default GitHubRoutes;
