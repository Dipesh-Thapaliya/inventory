import express from "express";

import {
   getProducts,
   addProduct,
   deleteProduct,
   updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

export default router;
