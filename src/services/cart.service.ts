import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import * as Commerce from "@chec/commerce.js";
import { Cart } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";

const commerce = new Commerce(
  "pk_test_43541828e887bed3fd26188d31b8df5efd349f1144ac2"
);

@Injectable({
  providedIn: "root",
})
export class CartService {
  private customerCart$: Subject<Cart> = new Subject<Cart>();

  constructor() {
    console.log("CartService constructed");
    commerce.cart
      .retrieve()
      .then((cart) => (this.customerCart$.next(cart)));
  }

  getCustomerCart(): Observable<Cart> {
    return this.customerCart$.asObservable();
  }

  // ADDS PRODUCT TO CART AND UPDATES CACHED CART
  addToCart(productToAdd: Product): Promise<any> {
    return commerce.cart.add(productToAdd.id, 1).then((response) => {
      this.customerCart$.next(response.cart);
    });
  }

  // CLEARS CART AND UPDATES LOCAL CART
  clearCart(): Promise<any> {
    return commerce.cart.empty().then((response) => {
      this.customerCart$.next(response.cart);
    });
  }
}
