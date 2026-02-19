import mongoose, { Document } from "mongoose";

export interface ISkill extends Document {
    name: string;
    category: string;
    iconKey: string;
}

const SkillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },
        iconKey: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
);

export const SkillModel = mongoose.model<ISkill>('Skill', SkillSchema);
export const getSkills = () => SkillModel.find();
export const getSkill = (category: string) => SkillModel.find({category});
export const createSkill = (values: Record<string, any>) => new SkillModel(values)
                            .save().then((skill) => skill.toJSON());
export const updateSkillById = (id: string, values: Record<string, any>) =>
                            SkillModel.findByIdAndUpdate(id, values);
export const deleteSkillById = (id: string) => SkillModel.findByIdAndDelete(id);