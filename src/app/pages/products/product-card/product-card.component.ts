import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Product } from "@chec/commerce.js/types/product";
import { ProductCardModalComponent } from "./product-card-modal/product-card-modal.component";
import { CartService } from "src/services/cart.service";
import { Cart } from "@chec/commerce.js/types/cart";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MESSAGES } from "src/assets/stringliteral.constants";

@Component({
  selector: "app-product-card",
  templateUrl: `./product-card.component.html`,
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  customerCart!: Cart;
  messages = MESSAGES;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    public cart: CartService,
  ) {}

  ngOnInit(): void {
    // SUBSCRIBE TO CART TO NOTE CHANGES
    this.cleanUpDescription(this.product.description);
  }

  // FUNCTION TO TAKE HTML TAGS OUT OF DESCRIPTION
  private cleanUpDescription(description: string) {
    this.product.description = description.replace(/<\/?[^>]+(>|$)/g, "");
  }

  public openProductModal(): void {
    let dialogRef = this.dialog.open(ProductCardModalComponent, {
      panelClass: "custom-dialog-container",
      data: { name: this.product.name, images: this.product.assets },
      height: "60%",
      width: "600px",
    });
  }

  public openSnackBar(message: string, snackBarClass: string): void {
    const snackBarRef = this.snackbar.open(message, "", { duration: 2000, panelClass: [snackBarClass] });
  }

  public onAddToCart(): void {
    // FETCH CURRENT VERSION OF CART
    this.customerCart = this.cart.getLatestCustomerCart();
    
    // CHECK TO SEE IF ITEM IS ALREADY IN CART, THROW ERROR IF SO
    for (let cartItem of this.customerCart.line_items) {
      if (cartItem.product_id === this.product.id) {
        this.openSnackBar(this.messages.alerts.addToCartWarning, "warning-snackbar");
        return;
      }
    }
    this.cart.addToCart(this.product).then((data) => {
      this.openSnackBar(this.messages.alerts.addToCartSuccess, "success-snackbar");
    });
  }
}
