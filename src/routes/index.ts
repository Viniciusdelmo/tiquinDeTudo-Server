import { Router } from "express";
import { categories, category } from "./categoriesRoute";

const router: Router = Router();
router.use("/categories", categories);

export { router };
