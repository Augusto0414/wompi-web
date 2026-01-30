import React from "react";
import { Button } from "../../../components/ui/Button";
import { formatPrice } from "../../../helpers/formatters";
import { useAppDispatch } from "../../../store/hooks";
import type { Product } from "../../../types";
import { addToCart } from "../../cart/store/cartSlice";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-50 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-400 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
        </div>
        <Button onClick={handleAddToCart} size="sm" variant="primary" className="w-full mt-2">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
