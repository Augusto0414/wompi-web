import wompiApi from "../../../api/wompi";
import type { Product } from "../../../types";

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
}

class ProductService implements IProductService {
  async getProducts(): Promise<Product[]> {
    const response = await wompiApi.get<Product[]>("/products");
    return response.data;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const response = await wompiApi.get<Product>(`/products/${id}`);
    return response.data;
  }
}

export const productService = new ProductService();
