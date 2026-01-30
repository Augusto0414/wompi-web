import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../../types';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isOpen: false,
};

// Helper: Pure function to calculate totals
const recalculateCartTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Helper: Mutates state to update totals
const updateTotals = (state: CartState) => {
  const { totalQuantity, totalPrice } = recalculateCartTotals(state.items);
  state.totalQuantity = totalQuantity;
  state.totalPrice = totalPrice;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(item => item.id === productToAdd.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...productToAdd, quantity: 1 });
      }

      updateTotals(state);
      state.isOpen = true; // Auto-open cart for better UX
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== productIdToRemove);
      updateTotals(state);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const targetItem = state.items.find(item => item.id === id);

      // Guard Clause: Item must exist
      if (!targetItem) return;

      // Guard Clause: Remove item if quantity is zero or less
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
        updateTotals(state);
        return;
      }

      // Default: Update quantity
      targetItem.quantity = quantity;
      updateTotals(state);
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    clearCart: (state) => {
      state.items = [];
      updateTotals(state);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isOpen;
