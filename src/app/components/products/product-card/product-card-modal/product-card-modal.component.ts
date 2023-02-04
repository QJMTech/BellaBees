import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card-modal',
  templateUrl:'./product-card-modal.component.html',
  styleUrls: ['./product-card-modal-component.css']
})
export class ProductCardModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string; images: any}) { }

  ngOnInit(): void { 
  }

}
