import type { Product } from '../../../types';

export interface IProductService {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
}

class MockProductService implements IProductService {
  private products: Product[] = [];

  constructor() {
    this.generateMockProducts();
  }

  private generateMockProducts() {
    const categories = ['Electronics', 'Clothing', 'Home', 'Accessories'];
    const images = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60', // Watch
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60', // Headphones
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60', // Shoes
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60', // Polaroid
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=60', // Sneakers
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=60', // Sunglasses
    ];

    for (let i = 1; i <= 50; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const image = images[Math.floor(Math.random() * images.length)];
      
      this.products.push({
        id: i.toString(),
        name: `${category} Product ${i}`,
        description: `This is a high-quality ${category.toLowerCase()} item number ${i}. Perfect for your needs.`,
        price: Math.floor(Math.random() * 200) + 10,
        category: category,
        image: image,
        rating: Math.floor(Math.random() * 5) + 1,
      });
    }
  }

  async getProducts(): Promise<Product[]> {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 500);
    });
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(this.products.find(p => p.id === id));
        }, 300);
    });
  }
}

export const productService = new MockProductService();
