//@ts-nocheck
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import AgentModel from '../models/agent'; // Make sure the path is correct

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY!,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done: any) => {
  try {
    const agent = await AgentModel.findById(payload.id); // Ensure you're looking up by the correct field
    if (agent) {
      return done(null, agent);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

export default passport;