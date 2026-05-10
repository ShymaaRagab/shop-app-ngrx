import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class cartService {
  constructor(private http: HttpClient) {}

  loadCartItems(): Observable<{ cart: CartItem }> {
    return this.http.get<{ cart: CartItem }>('https://fakestoreapi.com/carts');
  }

  addItem(item: CartItem): Observable<{ cart: CartItem }> {
    return this.http.post<{ cart: CartItem }>('https://fakestoreapi.com/carts', item);
  }
}
