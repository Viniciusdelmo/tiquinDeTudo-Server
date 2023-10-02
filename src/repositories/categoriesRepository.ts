import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";

const knexInstance: Knex = knex(config);

const selectAllCategoriesNames = async () =>
  await knexInstance("categories").select("name");

const selectCategoryById = async (id: number) =>
  await knexInstance("categories").select("*").where({ "categories.id": id });

const selectCategoryByName = async (name: string) =>
  await knexInstance("categories")
    .select("*")
    .where({ "categories.name": name });

const insertCategory = async (name: string) =>
  await knexInstance("categories").insert({ name });

const updateCategory = async (name: string, id: number) =>
  await knexInstance("categories").update({ name }).where({ id });

const deleteCategory = async (id: number) =>
  await knexInstance("categories").delete().where({ id });

const selectProductsByCategory = (id: number) =>
  knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ "products.category_id": id });

export default {
  selectAllCategoriesNames,
  selectCategoryById,
  selectCategoryByName,
  insertCategory,
  updateCategory,
  deleteCategory,
  selectProductsByCategory,
};
