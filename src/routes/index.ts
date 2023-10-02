import { Router } from "express";
import { categories, category } from "./categoriesRoute";
import { products } from "./productsRoute";

const router: Router = Router();
router.use("/categories", categories);
router.use("/products", products);

export { router };
