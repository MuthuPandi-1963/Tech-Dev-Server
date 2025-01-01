import express from 'express';
import FeatureModel from '../../Models/FeaturesModel.js';


const AddFeature = async (req, res) => {
  try {
    const { Title, Image, Description, categoryType } = req.body;

    // Create a new Feature document
    const feature = new FeatureModel({
      Title,
      Image, // Assuming the image is uploaded and the URL is passed from the frontend
      Description: Description || Title, // Default to Title if no description is provided
      categoryType, // Category ID from the frontend
    });

    const savedFeature = await feature.save();
    res.status(201).json({
        message :"Feature added successfully",
        savedFeature
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default AddFeature;
