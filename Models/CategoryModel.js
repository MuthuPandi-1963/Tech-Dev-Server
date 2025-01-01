import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      default: 'Common',
      unique :true
    },
    categoryImg: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      default: function () {
        return this.categoryName;
      },
    },
    
CategoryNavbarImage:{
  type: String,
  required: true,
}
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
