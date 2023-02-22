import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./pages/cart/cart.component";
import { ProductsComponent } from "./pages/products/products.component";

const routes: Routes = [
  {
    path: "home",
    component: ProductsComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
