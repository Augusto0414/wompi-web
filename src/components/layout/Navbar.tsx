import React from 'react';
import { selectCartTotalQuantity, toggleCart } from '../../feature/cart/store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100/50 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => (window.location.href = '/')}>
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">W</div>
             <span className="text-xl font-bold tracking-tight text-gray-900">
                WOMPI
             </span>
        </div> (

        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => dispatch(toggleCart())}
            className="relative"
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};
