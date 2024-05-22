import express from "express";
import * as dotenv from "dotenv";
import propertyRoutes from "./routes/property-routes";
import agentRoutes from "./routes/agent-routes";
import { connectToDB } from "./config/db";
import passport from "passport";
// import { authMiddleware } from "./helpers/validation/auth-helper";
const app = express();

connectToDB();

dotenv.config();

app.use(passport.initialize());

app.use(express.json());

app.use("/images", express.static("images"));

app.use("/api/property", propertyRoutes);
app.use("/api/agent", agentRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.BACKEND_API_ENDPOINT}:${PORT}`
  );
});
