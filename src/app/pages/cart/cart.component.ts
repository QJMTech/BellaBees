import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart.service";
import { Cart } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MESSAGES } from "src/assets/stringliteral.constants";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  customerCart!: Cart;
  messages = MESSAGES;

  constructor(
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    // get current value of customerCart (used if coming from home page)
    this.customerCart = this.cartService.getCustomerCart().value;

    // subscribe to future changes
    this.cartService.getCustomerCart().subscribe((cart) => {
      this.customerCart = cart;
    });
  }

  // HELPER FUNCTION TO OPEN SNACKBAR
  public openSnackBar(message: string, snackBarClass: string): void {
    const snackBarRef = this.snackbar.open(message, "", {
      duration: 2000,
      panelClass: [snackBarClass],
    });
  }

  // CALLS REMOVE FROM CART IN CART SERVICE
  public removeFromCart(item: Product): void {
    this.cartService.removeFromCart(item).then((data) => {
      this.openSnackBar(
        this.messages.alerts.removeFromCartSuccess,
        "success-snackbar"
      );
    });
  }
}
