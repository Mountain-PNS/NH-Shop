import express from 'express';
import { createOrder, getOrderById, getOrders } from '../controllers/Order';
const routerOrder = express.Router();
routerOrder.post("/order", createOrder)
routerOrder.get("/order", getOrders)
routerOrder.get("/order/:userId/:orderId", getOrderById)
export default routerOrder;