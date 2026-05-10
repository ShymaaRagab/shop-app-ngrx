import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { LoadProducts , LoadProductsSuccess , LoadProductsFailure} from './product.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadProducts),
      switchMap(() =>
        this.productsService.getAllProducts().pipe(
          map((products) => LoadProductsSuccess({ products })),
          catchError((error) => of(LoadProductsFailure({ error })))
        )
      )
    )
  );
}