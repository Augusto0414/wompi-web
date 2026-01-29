import React from 'react';
import { Button } from '../../../components/ui/Button';
import { useAppDispatch } from '../../../store/hooks';
import type { Product } from '../../../types';
import { addToCart } from '../../cart/store/cartSlice';

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
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.rating && (
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                <span className="text-yellow-400">★</span> {product.rating}
            </div>
        )}
         {/* Quick Add Overlay on Hover */}
         <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Button onClick={handleAddToCart} size="sm" variant="primary" className="w-full shadow-lg">
                Quick Add
            </Button>
         </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
            {product.category}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
