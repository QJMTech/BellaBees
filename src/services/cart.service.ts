import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import * as Commerce from "@chec/commerce.js";
import { Cart } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";
import { LoaderService } from "../services/loader.service";

const commerce = new Commerce(
  "pk_test_43541828e887bed3fd26188d31b8df5efd349f1144ac2"
);

@Injectable({
  providedIn: "root",
})
export class CartService {
  private customerCart$: BehaviorSubject<Cart>;
  private customerCart!: Cart; // Member variable to store the latest cart value

  constructor(private loaderService: LoaderService) {
    this.customerCart$ = new BehaviorSubject<Cart>(this.customerCart);

    this.loaderService.addPendingRequest();
    commerce.cart.retrieve().then((cart) => {
      this.customerCart = cart; // Store the latest cart value
      this.customerCart$.next(cart);
      this.loaderService.removePendingRequest();
    });
    // Subscribe to the customerCart$ observable to update the member variable
    this.customerCart$.subscribe((cart) => {
      this.customerCart = cart;
    });
  }

  getCustomerCart(): BehaviorSubject<Cart> {
    return this.customerCart$;
  }

  // ADDS PRODUCT TO CART AND UPDATES CACHED CART
  addToCart(productToAdd: Product): Promise<any> {
    this.loaderService.addPendingRequest();
    return commerce.cart.add(productToAdd.id, 1).then((response) => {
      this.customerCart$.next(response.cart);
      this.loaderService.removePendingRequest();
    });
  }

  // REMOVES PRODUCT TO CART AND UPDATES CACHED CART
  removeFromCart(productToRemove: Product): Promise<any> {
    this.loaderService.addPendingRequest();
    return commerce.cart.remove(productToRemove.id).then((response) => {
      this.customerCart$.next(response.cart);
      this.loaderService.removePendingRequest();
    });
  }

  // CLEARS CART AND UPDATES LOCAL CART
  clearCart(): Promise<any> {
    this.loaderService.addPendingRequest();
    return commerce.cart.empty().then((response) => {
      this.customerCart$.next(response.cart);
      this.loaderService.removePendingRequest();
    });
  }

  // Get the latest cart value
  getLatestCustomerCart(): Cart {
    return this.customerCart;
  }
}
