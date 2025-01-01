import {Router} from 'express'
import createOrder from '../Controllers/Orders/Orders.js'

const OrderRoutes = Router() 

OrderRoutes.post("/add_order",createOrder)


export default OrderRoutes