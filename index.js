import express from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

import UserRoutes from "./Users/routes.js";
import WordleRoutes from "./Wordles/routes.js";
import WordleGuessesRoutes from "./WordleGuesses/routes.js";
import TournamentRoutes from "./Tournaments/routes.js";
import WordleExternalApiRoutes from "./WordleApi/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/social-wordle-app"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "social-wordle-app",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
WordleRoutes(app); 
TournamentRoutes(app);
WordleGuessesRoutes(app);
WordleExternalApiRoutes(app); // TODO use these routes to interface with external wordle api (get word of the day, get past words, etc.)

app.listen(process.env.PORT || 4000);