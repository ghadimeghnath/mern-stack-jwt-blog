import mongoose from 'mongoose';

const  mongoDb = async ()=> {
    const MONGO_URI = process.env.MONGO_URI; 
 await mongoose.connect(MONGO_URI).then(()=>{
    console.log("Database connected successfully"); 
}).catch((err)=>{
    console.log("error while conneting to Database");
})
}

export default mongoDb
