import mongoose from 'mongoose';

const FeaturesSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      default: 'Common',
      unique :true
    },
    Image: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      
    },
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    Position : {
      type:String,
      default:"right"
    }
},
  { timestamps: true }

);

const FeatureModel = mongoose.model('Feature', FeaturesSchema);
export default FeatureModel;
