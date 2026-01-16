import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
    buffer: Buffer,
    folder = "portfolio_uploads"
) => {
    return new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });
};
