import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Product } from "@chec/commerce.js/types/product";
import { ProductCardModalComponent } from "./product-card-modal/product-card-modal.component";
import { CartService } from "src/services/cart.service";
import { LoadingService } from "src/services/loading.service";
import { Cart } from "@chec/commerce.js/types/cart";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-card",
  templateUrl: `./product-card.component.html`,
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  customerCart!: Cart;

  constructor(
    public loader: LoadingService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    // SUBSCRIBE TO CART
    this.cart.getCustomerCart().subscribe((value) => {
      this.customerCart = value;
    });
    this.cleanUpDescription(this.product.description);
    this.loader.hide();
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

  public openSnackBar(message: string): void {
    let snackBarRef = this.snackbar.open(message, "", { duration: 2000 });
  }

  public onAddToCart(): void {
    // CHECK TO SEE IF ITEM IS ALREADY IN CART, THROW ERROR IF SO
    for (let cartItem of this.customerCart.line_items) {
      if (cartItem.product_id === this.product.id) {
        this.openSnackBar("Item already in cart.");
        return;
      }
    }
    this.loader.show();
    this.cart.addToCart(this.product).then((data) => {
      this.loader.hide();
    });
  }
}
