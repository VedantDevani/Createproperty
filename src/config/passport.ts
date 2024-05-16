// import passport from "passport";
// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import * as dotenv from "dotenv";
// import { getDataByCollectionName } from "../helpers/validation/auth-validator";
// 
// dotenv.config();
// 
// const jwtSecret = process.env.JWT_SECRET_KEY!;
// 
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: jwtSecret,
// };
// 
// const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: any, done) => {
//   try {
//     const user = await getDataByCollectionName("users", payload.userId);
//     if (user) {
//       return done(null, user);
//     }
//     return done(null, false);
//   } catch (error) {
//     return done(error, false);
//   }
// });

// passport.use(jwtStrategy);

// export default passport;
