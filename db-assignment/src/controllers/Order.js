import moongoose from 'mongoose';
import {StatusCodes} from 'http-status-codes';
import Order from '../models/Order';

export const createOrder = async (req, res) => {
    try {
        const {userId, orderItems, totalPrice, customerInfo} = req.body;
        const order = await Order.create({userId, orderItems, totalPrice, customerInfo});
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message})
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if(!orders) {
            return res.status(StatusCodes.NOT_FOUND).json({message : 'No orders found'})
        }
        return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message})
    }
}

export const getOrderById = async (req, res) => {
    try {
        console.log(req.params);
        const {userId, orderId} = req.params;           
        const order = await Order.findOne({userId, _id: orderId});
        // if(!order) {
        //     return res.status(StatusCodes.NOT_FOUND).json({message : 'No order found'})
        // }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message})
    }
}
export const updateOrder = async (req, res) => {
    try {
        const {userId, orderId} = req.params;           
        const order = await Order.findByIdAndUpdate({userId, _id: orderId}, req.body, {new: true});
        if(!order) {
            return res.status(StatusCodes.NOT_FOUND).json({message : 'No order found'})
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message})
    }
}
export const deleteOrder = async (req, res) => {
    try {
        const {userId, orderId} = req.params;           
        const order = await Order.findOne({ _id: orderId});
        if(!order) {
            return res.status(StatusCodes.NOT_FOUND).json({message : 'No order found'})
        }
        if(order.status !== "pending") {
            return res.status(StatusCodes.UNAUTHORIZED).json({message : 'Odred is not pending, cannot delete it'})
        }
        await Order.findByIdAndDelete({userId, _id: orderId});
        return res.status(StatusCodes.OK).json({message : " Order deleted successfully"});
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error.message})
    }
}