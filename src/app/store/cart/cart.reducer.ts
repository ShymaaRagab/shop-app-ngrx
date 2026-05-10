import { createReducer, on } from '@ngrx/store';
import {
  loadItems,
  loadItemsSuccess,
  addItem,
  addItemSuccess,
  loadItemsFailure,
} from './cart.actions';
import { CartItem } from '../../interfaces/cart';

interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: any;
}

export const initialCartState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

export const CartsReducer = createReducer(
  initialCartState,
  
  on(loadItems, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(loadItemsSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    cart: action.items,
  })),
  
  on(loadItemsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
    cart: [],
  })),
  
  on(addItem, (state, action) => ({
    ...state,
    cart: [...state.cart, action.item],
  })),
  
  on(addItemSuccess, (state, action) => ({ ...state, cart: [...state.cart] })),
  
  on(loadItemsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
