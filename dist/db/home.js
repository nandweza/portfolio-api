"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHomeDataById = exports.updateHomeData = exports.createHomeData = exports.getHomeDataById = exports.getHomeData = exports.HomeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HomeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    imagePublicId: {
        type: String,
    },
}, { timestamps: true });
exports.HomeModel = mongoose_1.default.model('Home', HomeSchema);
const getHomeData = () => exports.HomeModel.find();
exports.getHomeData = getHomeData;
const getHomeDataById = (id) => exports.HomeModel.findById(id);
exports.getHomeDataById = getHomeDataById;
const createHomeData = (values) => new exports.HomeModel(values)
    .save().then((homeData) => homeData.toJSON());
exports.createHomeData = createHomeData;
const updateHomeData = (id, values) => exports.HomeModel.findByIdAndUpdate(id, values);
exports.updateHomeData = updateHomeData;
const deleteHomeDataById = (id) => exports.HomeModel.findByIdAndDelete(id);
exports.deleteHomeDataById = deleteHomeDataById;
