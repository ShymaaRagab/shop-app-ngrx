import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "../../interfaces/product-state";
import { ProductCategory } from "../../interfaces/product";

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  state => state.products
);

export const selectLoading = createSelector(
  selectProductsState,
  state => state.loading
);

export const selectError = createSelector(
  selectProductsState,
  state => state.error
);


export const electronicsProducts = createSelector(
  selectProductsState,
  state => state.products.filter(product => product.category === ProductCategory.Electronics)
);

export const womensClothingProducts = createSelector(
  selectProductsState,
  state => state.products.filter(product => product.category === ProductCategory.WomensClothing)
);

export const mensClothingProducts = createSelector(
  selectProductsState,
  state => state.products.filter(product => product.category === ProductCategory.MensClothing)
);

export const ClothingProducts = createSelector(
  selectProductsState,
  state => state.products.filter(product => product.category.includes(ProductCategory.AllClothing))
);