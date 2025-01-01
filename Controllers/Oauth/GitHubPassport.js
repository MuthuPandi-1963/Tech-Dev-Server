import passport from 'passport'
import passportGithub from 'passport-github2'
import UserModel from '../../Models/UserModels.js';

const appLocalUrl = process.env.APPLICATION_URL_LOCAL;
const appGlobalUrl = process.env.APPLICATION_URL_GLOBAL;
const environment = process.env.NODE_ENV;

const URL = environment === "production" ? appGlobalUrl : appLocalUrl;

passport.use(new passportGithub.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${URL}/oauth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await UserModel.findOne({ authId: profile.id });
      // console.log(profile);
      
      if (existingUser) {
        // If user exists, update the user status to logged in and return the user
        existingUser.isLoggedIn = true;
        await existingUser.save();
        return done(null, existingUser);
      } else {
        // If user doesn't exist, create a new user
        const newUser = new UserModel({
          authType: 'Github',
          authId: profile.id,
          email: profile.email || `githubUser${profile.id}@gmail.com`,  // Use Google email
          username: profile.username,  // Use Google profile name
          isLoggedIn: true,
          isVerified :true
        });

        await newUser.save();
        return done(null, newUser);
      }
    }
  ));
  
  // Serialize user into session
  passport.serializeUser((user, done) => done(null, user));
  
  // Deserialize user from session
  passport.deserializeUser((user, done) => done(null, user));
  
