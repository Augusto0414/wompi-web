import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../../types';
import { productService } from '../services/productService';

interface CatalogState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCategory: string | null;
}

const initialState: CatalogState = {
  products: [],
  status: 'idle',
  error: null,
  selectedCategory: null,
};

export const fetchProducts = createAsyncThunk('catalog/fetchProducts', async () => {
  const products = await productService.getProducts();
  return products;
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { filterByCategory } = catalogSlice.actions;

export default catalogSlice.reducer;

// Selectors
export const selectAllProducts = (state: { catalog: CatalogState }) => state.catalog.products;
export const selectCatalogStatus = (state: { catalog: CatalogState }) => state.catalog.status;
export const selectFilteredProducts = (state: { catalog: CatalogState }) => {
    const { products, selectedCategory } = state.catalog;
    if (!selectedCategory || selectedCategory === 'All') return products;
    return products.filter(product => product.category === selectedCategory);
};
