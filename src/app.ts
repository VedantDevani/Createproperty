import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import propertyRoutes from "./routes/property-routes";
import agentRoutes from "./routes/agent-routes";
import { connectToDB } from "./config/db";
import passport from "./config/passport";
import session from "express-session";

import { authMiddleware } from "./helpers/validation/auth-middleware";
import path from "path";
const app = express();

connectToDB();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "client", "index.html")));
app.use("/images", express.static("images"));

app.use("/api/agent", agentRoutes);
app.use("/api/property", authMiddleware, propertyRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/auth/protected"); // Redirect to home page or dashboard
  }
);

app.get(
  "/auth/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Hello there!!!!");
  }
);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.BACKEND_API_ENDPOINT}:${PORT}`
  );
});
