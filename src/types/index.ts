type Category = {
  name: string;
};
interface CategoryId extends Category {
  id: number;
}

type Name = {
  name: string;
};

interface ProductDefault {
  id?: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  category_id?: number;
}

interface Product extends ProductDefault {
  rate: number;
  count: number;
}

type ProductFromDB = {
  id?: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  category_id?: number;
  rating: { rate: number; count: number };
};

interface RawProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface UpdateProduct extends RawProduct {
  id: number;
}

interface DataBaseProduct {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  count: number;
  category_id?: number;
}

interface userAuth {
  id: number;
  user: string;
}

interface UpdateProductTests {
  id: number;
  name: string;
  price: number;
}

export {
  Category,
  Name,
  Product,
  ProductFromDB,
  DataBaseProduct,
  RawProduct,
  UpdateProduct,
  CategoryId,
  userAuth,
  UpdateProductTests,
};
