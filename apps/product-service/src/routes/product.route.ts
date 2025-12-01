import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router: Router = Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
