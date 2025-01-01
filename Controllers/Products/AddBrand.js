import express from 'express';
import BrandModel from '../../Models/BrandModel.js'
// router.post('/add-brand', upload.single('brandImg'), 
const AddBrand = async (req, res) => {
  try {
    const { brandName, categoryType, brandDescription ,brandImage} = req.body;

    // Create a new Brand document
    const brand = new BrandModel({
      brandName,
      categoryType:[...categoryType],
      brandImg: brandImage, // Cloudinary returns this URL
      brandDescription: brandDescription || brandName, // Default to brandName
    });

    const savedBrand = await brand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default AddBrand;
