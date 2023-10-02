import knex from "knex";
import config from "./knexfile";

const knexInstance = knex(config);

 type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: { rate: number; count: number };
}; 

async function seedProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await response.json();

  for (const product of products) {
    const { title, price, description, image, category, rating } = product;

    const categoryId = await knexInstance("categories")
      .select("id")
      .where("name", category)
      .first();

    if (!categoryId) {
      console.error(`Category not found: ${category}`);
      continue;
    }

    await knexInstance("products").insert({
      title,
      price,
      description,
      image,
      category_id: categoryId.id,
      rate: rating.rate,
      count: rating.count,
    });
  }

  console.log(`Inserted ${products.length} products`);
}

seedProducts();