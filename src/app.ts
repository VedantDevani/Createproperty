import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import passport from "./config/passport";
import { connectToDB } from "./config/db";
import propertyRoutes from "./routes/property-routes";
import agentRoutes from "./routes/agent-routes";
import authgoogleRoutes from "./routes/auth-google";
import authFacebookRoutes from "./routes/auth-facebook";

import { authMiddleware } from "./helpers/validation/auth-middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

// Connect to MongoDB
connectToDB();

// Middleware
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

// Static files
app.use(express.static(path.join(__dirname, "client")));

// Routes
app.use("/api/agent", agentRoutes);
app.use("/google", authgoogleRoutes);
app.use('/facebook', authFacebookRoutes);
app.use("/api/property", authMiddleware, propertyRoutes);

// Route for serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
