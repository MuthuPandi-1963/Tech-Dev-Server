
import CartModel from '../../Models/CartModel.js';
import ProductModel from '../../Models/ProductModel.js'; // Assuming you have a Product model
import mongoose from 'mongoose'
// Add or Update Product in Cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Validate quantity
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update or create cart atomically
    const cart = await CartModel.findOneAndUpdate(
      { userId, "products.productId": productId },
      { $inc: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      // If cart or product doesn't exist, create a new entry
      const newCart = await CartModel.findOneAndUpdate(
        { userId },
        {
          $push: {
            products: {
              productId,
              productName: product.productName,
              brandName: product.brandType,
              price: product.sellingPrice,
              quantity,
              image: product.productImg,
            },
          },
        },
        { new: true, upsert: true }
      );
      return res.status(201).json(newCart);
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Remove Product from Cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    // if (!updatedCart || updatedCart.products.length === 0) {
    //   return res.status(404).json({ message: "Product not found in cart" });
    // }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in removeFromCart:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get User's Cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const cart = await CartModel.findOne({ userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({
      success : true ,
      data : cart
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
