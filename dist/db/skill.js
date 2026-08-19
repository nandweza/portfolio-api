"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkillById = exports.updateSkillById = exports.createSkill = exports.getSkill = exports.getSkills = exports.SkillModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SkillSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    iconKey: {
        type: String,
        required: true,
    },
    iconColor: {
        type: String,
    },
}, { timestamps: true });
exports.SkillModel = mongoose_1.default.model('Skill', SkillSchema);
const getSkills = () => exports.SkillModel.find();
exports.getSkills = getSkills;
const getSkill = (category) => exports.SkillModel.find({ category });
exports.getSkill = getSkill;
const createSkill = (values) => new exports.SkillModel(values)
    .save().then((skill) => skill.toJSON());
exports.createSkill = createSkill;
const updateSkillById = (id, values) => exports.SkillModel.findByIdAndUpdate(id, values);
exports.updateSkillById = updateSkillById;
const deleteSkillById = (id) => exports.SkillModel.findByIdAndDelete(id);
exports.deleteSkillById = deleteSkillById;
