import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './DataBase/db.js';
import authRouter from './Routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport'
import "./Controllers/Oauth/Passport.js"
import "./Controllers/Oauth/GitHubPassport.js"
import GoogleRoutes from './Routes/OauthRoutes.js';
import session from 'express-session'
import GitHubRoutes from './Routes/GithubRoutes.js';
import  'multer-storage-cloudinary';
import multer from 'multer'
import ProductRoutes from './Routes/ProductRoutes.js';
import upload from './Helpers/Cloudinary/MulterConfig.js'
import cloudinaryConfig from './Helpers/Cloudinary/CloudinaryConfig.js'
import OrderRoutes from './Routes/OrderRoutes.js';
import CartRoutes from './Routes/CartRoutes.js';
import FavoriteRoute from './Routes/FavouriteRoutes.js';
const app = express();

const environment = process.env.NODE_ENV 
const frontendLocalUrl = process.env.FRONT_END_URL_LOCAL
const frontendGlobalUrl = process.env.FRONT_END_URL_GLOBAL

const corsURL = environment === "production" ? frontendGlobalUrl : frontendLocalUrl
// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: environment === "production",sameSite:"None" },
  })
);
  
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin:corsURL, // Frontend URL
    credentials: true, // Allow cookies to be sent in requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
// Auth routes
app.use('/api', authRouter);
app.use("/auth",GoogleRoutes);
app.use("/oauth",GitHubRoutes);
app.use("/api",ProductRoutes)
app.use("/api",OrderRoutes)
app.use("/api",CartRoutes)
app.use("/api",FavoriteRoute)

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    ConnectDB(); // Connect to database
    console.log(`Server running successfully on PORT :${PORT}`);
});
