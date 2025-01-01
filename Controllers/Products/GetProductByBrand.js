import ProductModel from "../../Models/ProductModel.js";

const GetProductsByBrand = async (req, res) => {
  const { brandId } = req.params; // Extracting `brandId` from route params

  try {
    // Fetch products where `brandId` is present in the `brandType` array
    const products = await ProductModel.find({ brandType: { $in: [brandId] } });

    if (!products.length) {
      return res.status(200).json({
        success: true,
        message: "No products in that brand",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      // message: "Products from that brand",
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

export default GetProductsByBrand;
