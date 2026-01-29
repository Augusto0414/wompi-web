import React from 'react';
import { CartDrawer } from '../../feature/cart/components/CartDrawer';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
            &copy; 2026 Wompi Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
