import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Product } from "@chec/commerce.js/types/product";

@Component({
  selector: "app-product-card",
  templateUrl: `./product-card.component.html`,
  styles: [],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cleanUpDescription(this.product.description);
  }

  // FUNCTION TO TAKE HTML TAGS OUT OF DESCRIPTION
  private cleanUpDescription(description: string) {
    this.product.description = description.replace(/<\/?[^>]+(>|$)/g, "");
  }

  public openProductModal () {
    let dialogRef = this.dialog.open(ProductCardComponent, {
      data: { name: 'austin'},
      height: '400px',
      width: '600px',
    });
  }
}
