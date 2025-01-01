import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: 'Common',
    },
    brandImg: {
      type: String,
      required: true,
    },
    categoryType: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }],
    brandDescription: {
      type: String,
      default: function () {
        return this.brandName;
      },
    },
  },
  { timestamps: true }
);

const BrandModel = mongoose.model('Brand', BrandSchema);
export default BrandModel;
