import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Product } from "@chec/commerce.js/types/product";
import { ProductCardModalComponent } from "./product-card-modal/product-card-modal.component";
import { CartService } from "src/services/cart.service";
import { LoadingService } from "src/services/loading.service";

@Component({
  selector: "app-product-card",
  templateUrl: `./product-card.component.html`,
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  loading$ = this.loader.loading$;

  constructor(
    public loader: LoadingService,
    private dialog: MatDialog,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    this.cleanUpDescription(this.product.description);
  }

  // FUNCTION TO TAKE HTML TAGS OUT OF DESCRIPTION
  private cleanUpDescription(description: string) {
    this.product.description = description.replace(/<\/?[^>]+(>|$)/g, "");
  }

  public openProductModal ():void  {
    let dialogRef = this.dialog.open(ProductCardModalComponent, {
      panelClass: 'custom-dialog-container',
      data: { name: this.product.name,
      images: this.product.assets },
      height: '60%',
      width: '600px',
    });
  }

  public onAddToCart(): void{
    this.loader.show()
    this.cart.addToCart(this.product)
    this.loader.hide()
  }
}
