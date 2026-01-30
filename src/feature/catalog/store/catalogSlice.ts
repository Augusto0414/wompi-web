import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../../types";
import { productService } from "../services/productService";

interface CatalogState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
}

const initialState: CatalogState = {
  products: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

export const fetchProducts = createAsyncThunk("catalog/fetchProducts", async () => {
  const products = await productService.getProducts();
  return products;
});

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchTerm } = catalogSlice.actions;

export default catalogSlice.reducer;

// Selectors
export const selectAllProducts = (state: { catalog: CatalogState }) => state.catalog.products;
export const selectCatalogStatus = (state: { catalog: CatalogState }) => state.catalog.status;
export const selectSearchTerm = (state: { catalog: CatalogState }) => state.catalog.searchTerm;
export const selectFilteredProducts = (state: { catalog: CatalogState }) => {
  const { products, searchTerm } = state.catalog;
  if (!searchTerm.trim()) return products;
  const lowerSearch = searchTerm.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerSearch) || product.description.toLowerCase().includes(lowerSearch),
  );
};
