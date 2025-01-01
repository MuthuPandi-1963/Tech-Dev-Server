import ProductModel from "../../Models/ProductModel.js";

const GetProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
     // Find all products in the database
    res.status(200).json(
        products); // Return products in JSON format
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" }); // Error handling
  }
};

export default GetProducts;
