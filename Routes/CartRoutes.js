import {Router} from 'express'
import { addToCart, getCart, removeFromCart } from '../Controllers/Orders/Carts.js';

const CartRoutes = Router()
CartRoutes.post('/add_cart', addToCart);

// Remove product from Cart
CartRoutes.delete('/delete_cart', removeFromCart);

// Get user's Cart
CartRoutes.get('/get_cart/:userId', getCart);

export default CartRoutes;