import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://nishant:nishant123@cluster0.u7rcrum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/reactjs-food-delivery-app').then(()=>{
       console.log('DB connected') ;
    })
}