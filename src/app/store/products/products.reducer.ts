import { createReducer, on } from "@ngrx/store";
import { LoadProducts , LoadProductsSuccess , LoadProductsFailure } from "./product.actions";
import { initialState } from '../../interfaces/product-state';


export const productsReducer = createReducer(
  initialState,

  on(LoadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(LoadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),

  on(LoadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);