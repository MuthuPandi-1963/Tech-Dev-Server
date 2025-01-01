import ProductModel from '../../Models/ProductModel.js';

const AddProduct = async (req, res) => {
  try {
    const {
      productName,
      brandType,
      categoryType,
      originalPrice,
      sellingPrice,
      description,
      specification,
      stock,
      productImage,
      trending, // Include trending
      offer,    // Include offer
    } = req.body;

    // Input validation
    if (!productName || !brandType || !categoryType || !originalPrice || !sellingPrice) {
      return res.status(400).json({ 
        success :false,
        message: "All required fields must be provided." ,
      data :null});
    }

    if (sellingPrice > originalPrice) {
      return res.status(400).json({ 
        success :false,
        message: "Selling price cannot exceed the original price." });
    }

    if (productImage && !/^https?:\/\/.+/i.test(productImage)) {
      return res.status(400).json({ 
        success :false,
        message: "Invalid product image URL." });
    }

    if (offer && (offer < 0 || offer > 100)) {
      return res.status(400).json({ 
        success :false,
        message: "Offer must be between 0 and 100." });
    }

    // Create a new Product document
    const product = new ProductModel({
      productName,
      brandType,
      categoryType,
      originalPrice,
      sellingPrice,
      description,
      specification,
      stock: stock || 0, // Default stock to 0 if not provided
      productImg :productImage, // Cloudinary URL (optional)
      trending: trending || false, // Default trending to false if not provided
      offer: offer || 0, // Default offer to 0 if not provided
    });

    const savedProduct = await product.save();

    res.status(201).json({ success: true,message : "Product Added successfully", data: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default AddProduct;
