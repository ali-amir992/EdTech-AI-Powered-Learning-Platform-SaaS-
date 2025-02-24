import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '@models/userModel';

// Add this interface at the top
interface UserDocument {
  id: string;
  email: string;
  role: string;
}

const setupGoogleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/api/v1/user/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ email: profile.emails?.[0].value });

          if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
              name: profile.displayName,
              email: profile.emails?.[0].value,
              password: "GOOGLE_OAUTH", // You might want to handle this differently
              role: "Student", // Default role
              image: profile.photos?.[0].value,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
};

export default setupGoogleAuth;