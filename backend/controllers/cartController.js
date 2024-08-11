import userModel from "../models/userModel.js";

// add item in cart

const addToCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, massage:"Added to cart"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, massage:"Error"});

    }
}

// remove from cart

const removeFromCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, massage:"Removed from cart"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, massage:"Error"});

    }
}

// fetch user cart

const getCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    }
    catch(error){
        console.log(error);
        res.json({success:false, massage:"Error"});
    }
}

export {addToCart, removeFromCart, getCart}