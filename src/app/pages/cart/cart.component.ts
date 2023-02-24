import { Component, OnInit } from "@angular/core";
import * as Commerce from "@chec/commerce.js";
import { CartService } from "src/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  public isLoading: boolean = false;
  constructor(public cart: CartService) {}

  ngOnInit(): void {
    const commerce = new Commerce(
      "pk_test_43541828e887bed3fd26188d31b8df5efd349f1144ac2"
    );

    // CACHE ARRAY OF PRODUCTS TO REDUCE CALLS TO API
    commerce.products.list().then((product) => {
      console.log(product);
    });
  }
}
