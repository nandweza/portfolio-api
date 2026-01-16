import mongoose, { Document } from "mongoose";

export interface IHome extends Document {
    name: string;
    title: string;
    description: string;
    resume: string;
    image: string;
    imagePublicId: string;
}

const HomeSchema = new mongoose.Schema(
    {
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
    }, {timestamps: true}
)

export const HomeModel = mongoose.model<IHome>('Home', HomeSchema);

export const getHomeData = () => HomeModel.find();

export const createHomeData = (values: Record<string, any>) => new HomeModel(values)
                            .save().then((homeData) => homeData.toJSON());

export const updateHomeData = (id: string, values: Record<string, any>) =>
                                HomeModel.findByIdAndUpdate(id, values);

export const deleteHomeDataById = (id: string) => HomeModel.findByIdAndDelete(id);