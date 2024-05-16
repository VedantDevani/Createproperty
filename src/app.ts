import express from "express";
import * as dotenv from "dotenv";
import propertyRoutes from "./routes/property-routes";
// import agentBuyerPropertyRoutes from "./routes/agent-buyer-property-routes";
import { connectToDB } from "./config/db";
// import passport from "./config/passport";
// import { authMiddleware } from "./helpers/auth-helper";

const app = express();

connectToDB();

dotenv.config();

// app.use(passport.initialize());

app.use(express.json());

app.use("/images", express.static("images"));

app.use("/api/property",  propertyRoutes);
// app.use("/api/agent-buyer-property", authMiddleware, agentBuyerPropertyRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.BACKEND_API_ENDPOINT}:${PORT}`
  );
});
