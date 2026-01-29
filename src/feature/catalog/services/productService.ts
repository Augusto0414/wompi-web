import type { Product } from "../../../types";

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
    const productData = [
      {
        category: "Electronics",
        items: [
          {
            name: "Wireless Pro Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60",
            description: "Noise-cancelling headphones with premium sound",
          },
          {
            name: "Sport Smartwatch",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60",
            description: "Smart watch with health monitor and GPS",
          },
          {
            name: "Retro Instant Camera",
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60",
            description: "Polaroid camera to capture special moments",
          },
          {
            name: "Bluetooth Speaker",
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60",
            description: "Portable speaker with surround sound",
          },
          {
            name: "Wireless Charger",
            image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=500&q=60",
            description: "Fast charger compatible with all devices",
          },
        ],
      },
      {
        category: "Clothing",
        items: [
          {
            name: "Elite Running Shoes",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60",
            description: "Ultra-light sneakers for runners",
          },
          {
            name: "Urban Sneakers",
            image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=60",
            description: "Casual footwear with modern style",
          },
          {
            name: "Premium T-Shirt",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60",
            description: "100% organic cotton t-shirt",
          },
          {
            name: "Waterproof Jacket",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=60",
            description: "Water and wind resistant jacket",
          },
          {
            name: "Classic Jeans",
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=60",
            description: "Denim pants with perfect fit",
          },
        ],
      },
      {
        category: "Home",
        items: [
          {
            name: "LED Desk Lamp",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=60",
            description: "Adjustable lamp with warm and cool light",
          },
          {
            name: "Desk Organizer",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=60",
            description: "Keep your space tidy and productive",
          },
          {
            name: "Thermal Mug",
            image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=60",
            description: "Mug that keeps your drink hot for hours",
          },
          {
            name: "Decorative Plant",
            image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=60",
            description: "High quality artificial plant",
          },
          {
            name: "Ergonomic Cushion",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=60",
            description: "Cushion with lumbar support for comfort",
          },
        ],
      },
      {
        category: "Accessories",
        items: [
          {
            name: "Polarized Sunglasses",
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=60",
            description: "UV protection with elegant style",
          },
          {
            name: "Minimalist Backpack",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60",
            description: "Durable backpack with modern design",
          },
          {
            name: "Leather Wallet",
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=60",
            description: "Elegant wallet with RFID protection",
          },
          {
            name: "Watch Strap",
            image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=500&q=60",
            description: "Premium interchangeable silicone strap",
          },
          {
            name: "Sports Cap",
            image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=60",
            description: "Breathable cap for outdoor activities",
          },
        ],
      },
    ];

    let id = 1;
    productData.forEach((categoryData) => {
      categoryData.items.forEach((item) => {
        this.products.push({
          id: id.toString(),
          name: item.name,
          description: item.description,
          price: Math.floor(Math.random() * 150) + 20,
          category: categoryData.category,
          image: item.image,
        });
        id++;
      });
    });
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
        resolve(this.products.find((p) => p.id === id));
      }, 300);
    });
  }
}

export const productService = new MockProductService();
