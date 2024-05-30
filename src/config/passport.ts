import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import * as dotenv from "dotenv";
import AgentModel from "../models/agent";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

// Configure JWT Strategy options
const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET! as string,
};

// Initialize and use the JwtStrategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done) => {
  try {
    const user = await AgentModel.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3004/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let agent = await AgentModel.findOne({ googleId: profile.id });
        if (!agent) {
          agent = new AgentModel({
            fullName: profile.displayName,
            email: profile.emails?.[0].value,
            googleId: profile.id,
          });
          await agent.save();
        }
        done(null, agent);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: "http://localhost:3004/facebook/callback"!,
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let agent = await AgentModel.findOne({ facebookId: profile.id });

        if (!agent) {
          agent = new AgentModel({
            fullName: profile.displayName,
            email: profile.emails?.[0].value,
            facebookId: profile.id,
          });

          await agent.save();
        }

        done(null, agent);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await AgentModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(jwtStrategy);

export default passport;
