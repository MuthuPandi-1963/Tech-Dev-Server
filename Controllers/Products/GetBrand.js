import BrandModel from "../../Models/BrandModel.js";

const GetBrand = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    console.log(brands);
     // Find all brands in the database
    res.status(200).json(brands); // Return brands in JSON format
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: "Error fetching brands" }); // Error handling
  }
};

export default GetBrand;
