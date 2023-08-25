import express from "express";

import {
   getProducts,
   addProduct,
   deleteProduct,
   updateProduct,
   fetchAboutToExpireProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(addProduct);
router.route("/expire").get(fetchAboutToExpireProduct)
router.route("/:id").delete(deleteProduct).put(updateProduct);

export default router;
