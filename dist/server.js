"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const db_1 = require("./config/db");
const port = 3000;
const hostname = 'http://127.0.0.1';
(0, db_1.startDataBase)()
    .then(() => {
    index_1.default.listen(port, () => {
        console.log(`Server is running on ${hostname}:${port}`);
    });
})
    .catch((error) => {
    console.error("Failed to start database:", error);
    process.exit(1);
});
