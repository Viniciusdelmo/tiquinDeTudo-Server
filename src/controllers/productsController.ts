import { NextFunction, Request, Response } from "express";
import productsServices from "../services/productsService";
import { ProductFromDB } from "../types";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allProducts = await productsServices.getAllProducts();
    res.status(200).send(allProducts);
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await productsServices.getProductById(id);
    res.status(200).send(product);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, price, description, category, image, rating } = req.body;
    const newProduct: ProductFromDB = {
      title,
      price,
      description,
      image,
      rating,
      category,
    };

    const insertedProduct = await productsServices.postProduct(newProduct);

    res.status(201).send(insertedProduct);
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const data = req.body;

    const product = {
      id,
      ...data,
    };
    const updatedProduct = await productsServices.updateProduct(product);

    res.status(201).send(updatedProduct);
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    /* const deleteProduct =  */ await productsServices.deleteProduct(id);
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error: unknown) {
    next(error);
  }
};

export default { index, show, insert, update, remove };
