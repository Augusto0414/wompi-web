import React from "react";
import { ProductGrid } from "../components/ProductGrid";

export const CatalogView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
        <p className="text-gray-500">Explore our latest collection of premium products.</p>
      </div>
      <ProductGrid />
    </div>
  );
};
