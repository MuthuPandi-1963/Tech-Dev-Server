import express from 'express';
import { authenticateUser } from '../Middleware/AuthenticateUser.js';
import { addToFavorite, getFavorite, removeToFavorite } from '../Controllers/Orders/Favorite.js';

const FavoriteRoute = express.Router();

// Route to Add Product to Favorite
FavoriteRoute.post('/add_favorite', authenticateUser, addToFavorite);

// Route to Remove Product from Favorite
FavoriteRoute.delete('/remove_favorite', authenticateUser, removeToFavorite);

// Route to Get User's Favorite List
FavoriteRoute.get('/get_favorite/:userId', authenticateUser, getFavorite);

export default FavoriteRoute;
