import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { LoadingService } from 'src/services/loading.service';
import { LineItem } from "@chec/commerce.js/types/line-item";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGES } from 'src/assets/stringliteral.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cartItems: Array<LineItem> = [];
  public totalValue: string = '';
  public isLoading: boolean = false;
  messages = MESSAGES;  

  constructor(
    public cart: CartService,
    public loader: LoadingService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loader.getIsLoading().subscribe(value => {
      this.isLoading = value;
    })

    // RETRIEVE CART FROM SERVICE TO UPDATE DROPDOWN
    this.cart.getCustomerCart().subscribe(value => {
      this.cartItems = value.line_items;
      this.totalValue = value.subtotal.formatted_with_symbol;
    })
  }

  public openSnackBar(message: string, snackBarClass: string): void {
    const snackBarRef = this.snackbar.open(message, "", { duration: 2000, panelClass: [snackBarClass] });
  }

  public onClearCart(): void{
    this.loader.show()
    this.cart.clearCart().then((data => {
      this.loader.hide()
      this.openSnackBar(this.messages.alerts.cartClearedSuccess, "success-snackbar");
    }))
  }
}
