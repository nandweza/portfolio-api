import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    password: string
}

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export const getUser = () => UserModel.find();

export const createUser = (values: Record<string, any>) => new UserModel(values)
                        .save().then((user) => user.toJSON());

export const updateUser = (id: string, values: Record<string, any>) =>
                            UserModel.findByIdAndUpdate(id, values);

export const deleteUser = (id: string) => UserModel.findByIdAndDelete(id);