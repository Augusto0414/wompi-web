import React, { useEffect } from "react";
import { Button } from "../../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts, filterByCategory, selectCatalogStatus, selectFilteredProducts } from "../store/catalogSlice";
import { ProductCard } from "./ProductCard";

export const ProductGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  // Using filtered selector
  const products = useAppSelector(selectFilteredProducts);
  const status = useAppSelector(selectCatalogStatus);
  const selectedCategory = useAppSelector((state) => state.catalog.selectedCategory);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = ["All", "Electronics", "Clothing", "Home", "Accessories"];

  if (status === "loading") {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat || (cat === "All" && !selectedCategory) ? "primary" : "outline"}
            size="sm"
            onClick={() => dispatch(filterByCategory(cat === "All" ? null : cat))}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500">No products found in this category.</div>
      )}
    </div>
  );
};
