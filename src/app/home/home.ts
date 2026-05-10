import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { Product, ProductCategory } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ClothingProducts,
  electronicsProducts,
  mensClothingProducts,
  selectError,
  selectLoading,
  selectProducts,
  womensClothingProducts,
} from '../store/products/products.selectors';
import { LoadProducts } from '../store/products/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  products$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;
  productCategory = ProductCategory;

  constructor(private store: Store , private router: Router) {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(LoadProducts());
  }

  addToCart(product: Product) {
    // Logic to add the product to the cart
    console.log(`Added ${product.title} to cart!`);
  }

  buyNow(product: Product) {
    // Logic to proceed to checkout with the product
    console.log(`Proceeding to buy ${product.title}!`);
  }

  filterByCategory(category: ProductCategory) {
    if (category == ProductCategory.Electronics) {
      this.products$ = this.store.select(electronicsProducts);
    } else if (category == ProductCategory.WomensClothing) {
      this.products$ = this.store.select(womensClothingProducts);
    } else if (category == ProductCategory.MensClothing) {
      this.products$ = this.store.select(mensClothingProducts);
    } else {
      this.products$ = this.store.select(ClothingProducts);
    }
  }

  refreshProducts() {
    this.store.dispatch(LoadProducts());
  }

  goToPrpfile() {
    // Logic to navigate to the profile page
    this.router.navigate(['/profile']);
    
  }
}
