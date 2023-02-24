import { Component, OnInit } from "@angular/core";
import * as Commerce from "@chec/commerce.js";
import { Product } from "@chec/commerce.js/types/product";
import { MESSAGES } from "src/assets/stringliteral.constants";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  public productArray: Array<Product> = [];
  messages = MESSAGES;
  
  constructor() {}

  ngOnInit(): void {
    // INIT COMMERCE INSTANCE FOR API REQS
    const commerce = new Commerce(
      "pk_test_43541828e887bed3fd26188d31b8df5efd349f1144ac2"
    );

    // CACHE ARRAY OF PRODUCTS TO REDUCE CALLS TO API
    commerce.products.list().then((product) => {
      this.productArray = product.data;
    });
  }
}
