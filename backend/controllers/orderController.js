import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import stripe from "stripe"

// placeing user order for frontend

const placeOrder = async(req,res)=>{

}

//  user order 

const userOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data:orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false, massage:"Error"});
    }
}
export {placeOrder, userOrders}