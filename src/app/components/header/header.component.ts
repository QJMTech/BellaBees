import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { LoadingService } from 'src/services/loading.service';
import { LineItem } from "@chec/commerce.js/types/line-item";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cartItems: Array<LineItem> = [];
  public totalValue: string = '';
  public isLoading: boolean = false;

  constructor(
    public cart: CartService,
    public loader: LoadingService,
  ) { }

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

  public onClearCart(): void{
    this.loader.show()
    this.cart.clearCart().then((data => {
      this.loader.hide()
    }))
  }
}
