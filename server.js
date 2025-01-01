// Import necessary modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

// Import custom modules
import ConnectDB from "./DataBase/db.js";
import authRouter from "./Routes/authRoutes.js";
import GoogleRoutes from "./Routes/OauthRoutes.js";
import GitHubRoutes from "./Routes/GithubRoutes.js";
import ProductRoutes from "./Routes/ProductRoutes.js";
import OrderRoutes from "./Routes/OrderRoutes.js";
import CartRoutes from "./Routes/CartRoutes.js";
import FavoriteRoutes from "./Routes/FavouriteRoutes.js";
import cloudinaryConfig from "./Helpers/Cloudinary/CloudinaryConfig.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Environment setup
const environment = process.env.NODE_ENV;
const frontendLocalUrl = process.env.FRONT_END_URL_LOCAL;
const frontendGlobalUrl = process.env.FRONT_END_URL_GLOBAL;
const corsURL = environment === "production" ? frontendGlobalUrl : frontendLocalUrl;

// Database connection
ConnectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: environment === "production", sameSite: "None" },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: corsURL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Routes
app.use("/api", authRouter);
app.use("/auth", GoogleRoutes);
app.use("/oauth", GitHubRoutes);
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);
app.use("/api", CartRoutes);
app.use("/api", FavoriteRoutes);

// Cloudinary configuration
// cloudinaryConfig();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
