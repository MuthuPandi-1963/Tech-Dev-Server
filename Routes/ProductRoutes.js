import {Router} from 'express'
import AddCategory from '../Controllers/Products/AddCategory.js'
import AddBrand from '../Controllers/Products/AddBrand.js'
import AddProduct from '../Controllers/Products/AddProducts.js'
import upload from '../Helpers/Cloudinary/MulterConfig.js'
import GetCategory from '../Controllers/Products/GetCategory.js'
import GetBrand from '../Controllers/Products/GetBrand.js'
import GetProducts from '../Controllers/Products/GetProducts.js'
import GetProductsByCategory from '../Controllers/Products/GetProductByCategory.js'
import GetProductsByBrand from '../Controllers/Products/GetProductByBrand.js'
import GetSingleProduct from '../Controllers/Products/GetSingleProduct.js'
import AddFeature from '../Controllers/Products/AddFeature.js'
import GetFeature from '../Controllers/Products/GetFeature.js'

const ProductRoutes = Router()
// upload.single("categoryImage")
ProductRoutes.post("/add_category" ,AddCategory)
ProductRoutes.post("/add_brand",AddBrand)
ProductRoutes.post("/add_product",AddProduct)
ProductRoutes.post("/add_feature",AddFeature)
ProductRoutes.get("/get_category",GetCategory)
ProductRoutes.get("/get_brand",GetBrand)
ProductRoutes.get("/get_product",GetProducts)
ProductRoutes.get("/get_feature",GetFeature)
ProductRoutes.get("/category/:categoryId",GetProductsByCategory)
ProductRoutes.get("/brand/:brandId",GetProductsByBrand)
ProductRoutes.get("/get_product/:productId",GetSingleProduct)
export default ProductRoutes;