import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart.service";
import { Cart } from "@chec/commerce.js/types/cart";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  customerCart!: Cart;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // get current value of customerCart (used if coming from home page)
    this.customerCart = this.cartService.getCustomerCart().value;

    // subscribe to future changes 
    this.cartService.getCustomerCart().subscribe((cart) => {
      this.customerCart = cart;
    });
  }

  public onClearCart(): void {
  }
}
