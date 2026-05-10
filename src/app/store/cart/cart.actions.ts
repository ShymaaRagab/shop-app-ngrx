import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../interfaces/cart';

export const loadItems = createAction('[Cart] Load Items');

export const loadItemsSuccess = createAction(
  '[Cart] Load Items Success',
  props<{ items: CartItem[] }>(),
);

export const loadItemsFailure = createAction(
  '[Cart] Load Items Failure',
  props<{ error: any }>(),
);

export const addItem = createAction('[Cart] Add Item', props<{ item: CartItem }>());

export const addItemSuccess = createAction('[Cart] Add Item Success', props<{ item: CartItem }>());

export const removeItem = createAction('[Cart] Remove Item', props<{ item: CartItem }>());

export const removeItemSuccess = createAction(
  '[Cart] Remove Item Success',
  props<{ item: CartItem }>(),
);
