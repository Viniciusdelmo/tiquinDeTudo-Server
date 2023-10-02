import productsController from "../controllers/productsController";
import { categories, category } from "./categoriesRoute";
import { Router } from "express";

const products  = Router();

products.use("/categories", categories);
products.use("/category", category);

products.get("/", productsController.index);
products.get("/:id", productsController.show);
products.post("/", productsController.insert);
products.put("/:id", productsController.update);
products.patch("/:id", productsController.update);
products.delete("/:id", productsController.remove);

export { products };
