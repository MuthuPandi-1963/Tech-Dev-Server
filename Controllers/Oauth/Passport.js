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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Optional: Debug log
        // console.log('Google Profile:', JSON.stringify(profile, null, 2));

        const existingUser = await UserModel.findOne({ authId: profile.id });

        if (existingUser) {
          existingUser.isLoggedIn = true;
          await existingUser.save();
          return done(null, existingUser);
        }

        // Fallback for email if Google does not return one
        const fallbackEmail = `googleUser${profile.id}@example.com`;
        const email = profile.emails?.[0]?.value || fallbackEmail;

        const newUser = new UserModel({
          authType: 'Google',
          authId: profile.id,
          email,
          username: profile.displayName,
          isLoggedIn: true,
          isVerified: true,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error('Google Strategy Error:', error);
        return done(error);
      }
    }
  )
);

// Serialize and Deserialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) return done(new Error('User not found'));
    done(null, user);
  } catch (error) {
    done(error);
  }
});
