import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Commerce from "@chec/commerce.js";
import { Cart } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product"

const commerce = new Commerce(
  "pk_test_43541828e887bed3fd26188d31b8df5efd349f1144ac2"
);

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private customerCart!:  BehaviorSubject<Cart>;
  
  
  
  constructor() {
    console.log("THIS HAS BEEN CONSTRUCTED")
    commerce.cart.retrieve().then((cart) => this.customerCart = new BehaviorSubject<Cart>(cart));
  }

  addToCart (productToAdd: Product) {
    commerce.cart.add(productToAdd.id, 5).then((response) => {
      console.log(response)
    });
  }
}
