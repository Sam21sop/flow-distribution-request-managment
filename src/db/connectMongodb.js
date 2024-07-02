import mongoose from "mongoose";
import processEnvVar from "../utils/processEnvVar.js";

const MONGO_DB_URL = processEnvVar.MONGO_DB_URL;
const DB_NAME = processEnvVar.DB_NAME;

const connectToMongodb = async () => {
    try {
        const dbInstance = await mongoose.connect(`${MONGO_DB_URL}/${DB_NAME}}`);
        console.log(`Mongodb connected to: ${dbInstance.connection.host}, Port:${dbInstance.connection.port}`);
    } catch (error) {
        console.log(error);
        throw error
    }
};


export default connectToMongodb;