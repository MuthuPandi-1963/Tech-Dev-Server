import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    originalPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    description: { type: String },
    specification: { type: String },
    stock: { type: Number, default: 0 },
    productImg: { type: String }, // Optional field for product images
    trending :{
     type : Boolean,
     default:false
    },
    offer :{
      type :Number,
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
