import CategoryModel from '../../Models/CategoryModel.js';

// router.post('/category', upload.single('categoryImg'), 
const AddCategory = async (req, res) => {
  try {
    console.log(req.body);
    
    
    const category = new CategoryModel({
      categoryName: req.body.categoryName,
      categoryImg: req.body.categoryImage, 
      CategoryNavbarImage : req.body.categoryNavbarImage,// Cloudinary URL
      categoryDescription: req.body.categoryDescription || req.body.categoryName,
    });
    const savedCategory = await category.save();
    res.status(201).json({
      success: true,
      message :"Category added successfully",
      data :savedCategory
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ 
      success :false,
      message : "upload failed"
     });
  }
};

export default AddCategory;