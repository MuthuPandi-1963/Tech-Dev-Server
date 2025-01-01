import FavoriteModel from '../../Models/FavoriteModel.js';
import ProductModel from '../../Models/ProductModel.js';  // Assuming you have a Product model
import mongoose from 'mongoose';

// Add or Update Product in Favorite
export const addToFavorite = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update or create favorite atomically
    const favorite = await FavoriteModel.findOneAndUpdate(
      { userId, "products.productId": productId },
      { new: true }
    );

    if (!favorite) {
      // If favorite or product doesn't exist, create a new entry
      const newFavorite = await FavoriteModel.findOneAndUpdate(
        { userId },
        {
          $push: {
            products: {
              productId,
              productName: product.productName,
              brandName: product.brandType,
              price: product.sellingPrice,
              image: product.productImg,
            },
          },
        },
        { new: true, upsert: true }
      );
      return res.status(201).json(newFavorite);
    }

    return res.status(200).json(favorite);
  } catch (error) {
    console.error("Error in addToFavorite:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Remove Product from Favorite
export const removeToFavorite = async (req, res) => {
  const { userId, productId } = req.body;
    console.log(req.body);
    
  try {
    const favorite = await FavoriteModel.findOne({ userId });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Remove the product from the favorite list
    const updatedFavorite = await FavoriteModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    return res.status(200).json(updatedFavorite);
  } catch (error) {
    console.error("Error in removeFromFavorite:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get User's Favorite List
export const getFavorite = async (req, res) => {
    const { userId } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      // Find the favorite entry for the user and populate the product details
      const favorite = await FavoriteModel.findOne({ userId })
        .populate({
          path: 'products.productId', // Assuming 'productId' is the reference to ProductModel
          select: 'productName brandType sellingPrice productImg trending offer _id' // Select the fields you need from the Product model
        });
  
      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
  
      // Return the favorite with populated product details
      return res.status(200).json({ success: true, data: favorite });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };