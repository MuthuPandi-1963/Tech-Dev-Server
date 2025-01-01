import FeatureModel from "../../Models/FeaturesModel.js";

const GetFeature = async (req, res) => {
  try {
    const categories = await FeatureModel.find();
    // console.log(categories);
     // Find all categories in the database
    res.status(200).json(categories); // Return categories in JSON format
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" }); // Error handling
  }
};

export default GetFeature;
