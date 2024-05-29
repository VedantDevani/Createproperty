import passport from "passport";
import { Strategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import AgentModel from "../models/agent";
import { Request } from 'express';

dotenv.config();

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) { 
    token = req.cookies['jwt'];
  }
  return token;
};

// Configure JWT Strategy options
const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET! as string,
};

// Initialize and use the JwtStrategy
const jwtStrategy = new Strategy(jwtOptions, async (payload: any, done) => {
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
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: "http://localhost:3004/api/agent/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
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
}));

passport.use(jwtStrategy);

export default passport;
