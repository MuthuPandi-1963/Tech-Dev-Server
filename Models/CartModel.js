import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // References the Product model
          required: true,
        },
        productName: { 
          type: String, 
          required: true 
        },
        brandName: { 
          type: String, 
          required: true 
        },
        price: { 
          type: Number, 
          required: true 
        },
        quantity: { 
          type: Number, 
          default :1 ,
          min: 1 // Ensure at least 1 product
        },
        image: { 
          type: String, 
          required: true 
        }, // URL to product image
      }
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
