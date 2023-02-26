import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '@chec/commerce.js/types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customerCart!: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.customerCart = this.cartService.getLatestCustomerCart();
    console.log(this.customerCart);
  }

  public onClearCart(): void {
    console.log(this.customerCart)
  }
}
