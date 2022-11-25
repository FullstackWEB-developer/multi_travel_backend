import { Router, Request, Response } from "express";
import dotenv from "dotenv";
// user defined
import auth from "../middleware/auth.middleware";
const path = require("path");
const multer = require("multer");


dotenv.config();

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, "../images");
    },
    filename: function (req: any, file: { fieldname: any; originalname: any; }, cb: (arg0: any, arg1: string) => void) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
        null,
        `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
        );
    },
});


function checkFileType(file: { originalname: any; mimetype: string; }, cb: (arg0: string, arg1: boolean) => void) {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb("Images only", true);
    }
}

const upload = multer({
    storage,
    fileFilter: function (req: any, file: { originalname: any; mimetype: string; }, cb: (arg0: string, arg1: boolean) => void) {
        checkFileType(file, cb);
    },
    });

const uploadRoutes = () => {
    const router = Router();

    router.post("/", auth, upload.array("image", 10), async (req, res) => {
        console.log(req.files);    
    });

  return router;
};

export default uploadRoutes;
