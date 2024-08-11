import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://dsujoy074:mongopass098@cluster0.msxhaph.mongodb.net/Food-delivery").then(()=>console.log("DB connected"));
}