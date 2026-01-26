import mongoose from "mongoose";
import envObj from "./env.config.js";


const connectToDatabase = async() => {
    try {
        await mongoose.connect(envObj.mongoUri, {
            dbName: "backend_aug_sep"
        });
        console.log("DB Connection Successfull")
        
    } catch (error) {
        console.log("DB Connection Failed")
        console.log(error);
        process.exit(1);
    }
};

export default connectToDatabase;