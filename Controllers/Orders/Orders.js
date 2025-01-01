import OrderModel from "../../Models/OrderModel.js";
import ProductModel from "../../Models/ProductModel.js";

const createOrder = async (req, res) => {
    try {
      const { userId, products, totalAmount, shippingAddress, paymentStatus } =
        req.body;
  
      // Validate the products and calculate total price
      const productDetails = await Promise.all(
        products.map(async (product) => {
          const dbProduct = await ProductModel.findById(product.productId);
          if (!dbProduct || dbProduct.stock < product.quantity) {
            throw new Error(
              `Product with ID ${product.productId} is out of stock or invalid.`
            );
          }
          dbProduct.stock -= product.quantity; // Update stock
          await dbProduct.save();
          return {
            productId: dbProduct._id,
            productName: dbProduct.productName,
            brandName: dbProduct.brandName,
            price: dbProduct.sellingPrice,
            quantity: product.quantity,
            image: dbProduct.productImg , // Include product image
          };
        })
      );
  
      // Create the order
      const order = new OrderModel({
        userId,
        products: productDetails,
        totalAmount,
        shippingAddress,
        paymentStatus,
      });
  
      const savedOrder = await order.save();
      res.status(201).json({
        success: true,
        message: "Order created successfully.",
        order: savedOrder,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create order.",
      });
    }
  };
  
export default createOrder;