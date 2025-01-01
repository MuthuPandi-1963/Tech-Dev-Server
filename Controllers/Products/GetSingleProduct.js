import ProductModel from "../../Models/ProductModel.js";

const GetSingleProduct = async (req, res) => {
    const {productId} = req.params
  try {
    const product = await ProductModel.findById(productId);
     // Find all products in the database
     const relatedProducts = await ProductModel.find({
        categoryType: product.categoryType,
        _id: { $ne: productId },
      }).limit(10);
    res.status(200).json({
        product,
        relatedProducts
    }); // Return products in JSON format
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" }); // Error handling
  }
};

export default GetSingleProduct;
