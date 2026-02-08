import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    techStack: string;  //it has to be an array, do not forget.
    liveUrl: string;
    codeUrl: string;
    image: string;
    imagePublicId: string;
}

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        techStack: {
            type: String,
            required: true,
        },
        liveUrl: {
            type: String,
            required: true,
        },
        codeUrl: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            required: true,
        },
        imagePublicId: {
            type: String,
        },   
    },{timestamps: true}
)

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
export const getProjects = () => ProjectModel.find();
export const createProject = (values: Record<string, any>) => new ProjectModel(values)
                            .save().then((project) => project.toJSON());

export const updateProjectById = (id: string, values: Record<string, any>) =>
                            ProjectModel.findByIdAndUpdate(id, values);

export const deleteProjectById = (id: string) => ProjectModel.findByIdAndDelete(id);