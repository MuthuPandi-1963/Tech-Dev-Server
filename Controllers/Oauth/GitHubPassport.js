import passport from 'passport'
import passportGithub from 'passport-github2'
import UserModel from '../../Models/UserModels.js';

const appLocalUrl = process.env.APPLICATION_URL_LOCAL;
const appGlobalUrl = process.env.APPLICATION_URL_GLOBAL;
const environment = process.env.NODE_ENV;
const URL = environment === "production" ? appGlobalUrl : appLocalUrl;

console.log(process.env.GITHUB_CLIENT_ID);
console.log(process.env.GITHUB_CLIENT_SECRET);
console.log(URL);

passport.use(new passportGithub.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${URL}/oauth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await UserModel.findOne({ authId: profile.id });

    if (existingUser) {
      existingUser.isLoggedIn = true;
      await existingUser.save();
      return done(null, existingUser);
    } else {
      const newUser = new UserModel({
        authType: 'Github',
        authId: profile.id,
        email: profile.emails?.[0]?.value || `githubUser${profile.id}@gmail.com`,
        username: profile.username,
        isLoggedIn: true,
        isVerified: true
      });

      await newUser.save();
      return done(null, newUser);
    }
  } catch (err) {
    console.error('GitHub Strategy Error:', err);
    return done(err);
  }
}

  ));
  
  // Serialize user into session
  passport.serializeUser((user, done) => done(null, user));
  
  // Deserialize user from session
  passport.deserializeUser((user, done) => done(null, user));
  
