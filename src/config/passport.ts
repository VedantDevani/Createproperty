import passport from "passport";
import { Strategy } from "passport-jwt";
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

passport.use(jwtStrategy);

export default passport;
