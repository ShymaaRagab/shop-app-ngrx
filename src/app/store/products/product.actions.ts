import { createAction, props } from '@ngrx/store';
import { Product } from '../../interfaces/product';

export const LoadProducts = createAction('[Products] Load Products');

export const LoadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>(),
);

export const LoadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>(),
);
