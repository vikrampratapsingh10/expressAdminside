import express from "express";
import {productAdd, save,saveProduct,productList,remove,viewProductDetail} from "../controller/product.controller.js";
import { verify } from "../middleware/authenticate.js";
import multer from "multer";

const upload = multer({dest: "public/images/"})

const router = express.Router();

router.get("/add", verify, productAdd);
router.get("/view",verify,productList);
router.get("/delete/:id", verify,remove)
router.get("/view/:id",verify,viewProductDetail)

// router.post("/save",upload.single("image") , verify, save)
// router.post("/save",saveProduct);


export default router;
