import { Component } from '@angular/core';
import * as Commerce from '@chec/commerce.js';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
  `,
  styles: []
})
export class AppComponent {
  title = 'bb-store';

  ngOnInit() {
    const commerce = new Commerce('{pk_test_43541828e887bed3fd26188d31b8df5efd349f1144ac2}')
  }
}