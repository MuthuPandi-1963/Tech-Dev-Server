import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        brandName: {
          type: String, // Store the brand name of the product
          required: true,
        },
        categoryName: {
          type: String, // Store the category name of the product
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);
export default FavoriteModel