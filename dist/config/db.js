"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDataBase = startDataBase;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
function getMongoUri() {
    const uri = process.env.DB_URI;
    if (!uri) {
        throw new Error("MONGO_URI is not defined in .env");
    }
    return uri;
}
async function startDataBase() {
    const mongoUri = getMongoUri();
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("DataBase connection successful.");
    }
    catch (error) {
        console.log("DataBase connection failed: ", error);
        process.exit(1);
    }
}
