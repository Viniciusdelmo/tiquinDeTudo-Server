import { Product } from "../types/index";
import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import { Category } from "../types";

const knexInstance: Knex = knex(config);

const selectAllProducts = () =>
  knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.image",
      "categories.name as category ",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id");

const selectProductById = async (id: number) =>
  await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.image",
      "categories.name as category ",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ "products.id": id });

const selectProductCategoryId = async (category: Category) =>
  await knexInstance("categories").select("id").where( category );

const insertProduct = async (product: Product) =>
  await knexInstance("products").insert(product);
  

const updateProduct = async (product: Product) =>
  await knexInstance("products").update(product).where({ id: product.id });

const deleteProductFromDB = async (id: number) =>
  await knexInstance("products").delete().where({ id });

export default {
  selectAllProducts,
  selectProductById,
  selectProductCategoryId,
  insertProduct,
  updateProduct,
  deleteProductFromDB,
};
