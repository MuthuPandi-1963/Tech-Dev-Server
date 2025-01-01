import ProductModel from "../../Models/ProductModel.js";

const GetProductsByCategory = async (req, res) => {
  const { categoryId } = req.params; // Extracting `categoryId` from route params

  try {
    // Fetch products filtered by category directly in the database
    const products = await ProductModel.find({ categoryType: categoryId });

    if (!products.length) {
      return res.status(200).json({
        success: true,
        message: "No products in that category",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products from that category",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: err.message,
    });
  }
};

export default GetProductsByCategory;
