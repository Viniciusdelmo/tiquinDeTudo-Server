import categoriesRepository from "../repositories/categoriesRepository";
import productRepository from "../repositories/productsRepository";
import { Category } from "../types";

const getCategoriesNames = async () => {
  const categories: Category[] =
    await categoriesRepository.selectAllCategoriesNames();
  const categoriesNames = categories.map((category: Category) => category.name);
  return categoriesNames;
};

const getCategoryById = async (id: number) => {
  const category = await categoriesRepository.selectCategoryById(id);
  if (!category.length) {
    throw new Error("Category not found");
  }
  return category[0];
};

const createCategory = async (name: string) => {
  const searchCategoryByName = await categoriesRepository.selectCategoryByName(
    name
  );
  if (!searchCategoryByName.length) {
    const createdCategoryId = await categoriesRepository.insertCategory(name);
    return { id: createdCategoryId[0], name };
  }
  throw new Error("Category already exists");
};

const putCategory = async (name: string, id: number) => {
  const searchCategoryByName = await categoriesRepository.selectCategoryByName(
    name
  );
  if (!searchCategoryByName.length) {
    const updatedCategory = await categoriesRepository.updateCategory(name, id);
    if (!updatedCategory) throw new Error("Category not found");
    return { id, name };
  }
  throw new Error("Category already exists");
};

const removeCategory = async (id: number) => {
  const deletedCategory = await categoriesRepository.deleteCategory(id);
  if (!deletedCategory) throw new Error("Category does not exist");
  return { message: "Category deleted" };
};

 const getProductsByCategory = async (categoryName: Category) => {
  const id = await productRepository.selectProductCategoryId(categoryName);

  if (id.length === 0) {
    throw new Error("Category does not exist");
  }

  const products = await categoriesRepository.selectProductsByCategory(
    id[0].id
  );

  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rate,
        count: product.count,
      },
    };
  });

  return formattedProducts;
}; 

export default {
  getCategoriesNames,
  getCategoryById,
  createCategory,
  putCategory,
  removeCategory,
  getProductsByCategory
};
