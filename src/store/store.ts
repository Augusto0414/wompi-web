import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/cart/store/cartSlice';
import catalogReducer from '../feature/catalog/store/catalogSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
