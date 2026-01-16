import multer from "multer";
import { AppError } from "../utils/appError";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
            return cb(new AppError("Only images are allowed", 400));
        }
        cb(null, true);
};

export const upload = ({
    maxSizeMB = 5,
    multiple = false,
    fieldName = "image",
}: {
    maxSizeMB?: number;
    multiple?: boolean;
    fieldName?: string;
}) => {
    const multerUpload = multer({
        storage,
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
        fileFilter,
    });

    return multiple
        ? multerUpload.array(fieldName)
        : multerUpload.single(fieldName);
};
