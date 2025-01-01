import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../../Models/UserModels.js';

const appLocalUrl = process.env.APPLICATION_URL_LOCAL;
const appGlobalUrl = process.env.APPLICATION_URL_GLOBAL;
const environment = process.env.NODE_ENV;

const URL = environment === "production" ? appGlobalUrl : appLocalUrl;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Add your Google client ID here
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Add your Google client secret here
      callbackURL: `${URL}/auth/google/callback`, // Adjust based on your server URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user already exists in the database
      const existingUser = await UserModel.findOne({ authId: profile.id });

      if (existingUser) {
        // If user exists, update the user status to logged in and return the user
        existingUser.isLoggedIn = true;
        await existingUser.save();
        return done(null, existingUser);
      } else {
        // If user doesn't exist, create a new user
        const newUser = new UserModel({
          authType: 'Google',
          authId: profile.id,
          email: profile.emails[0].value, // Use Google email
          username: profile.displayName, // Use Google profile name
          isLoggedIn: true,
          isVerified: true
        });

        await newUser.save();
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); // Store the user's _id in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
