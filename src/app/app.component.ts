import { Component } from "@angular/core";
import { LoaderService } from "src/services/loader.service";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <app-spinner *ngIf="loaderService.getLoading()"></app-spinner>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "bb-store";

  constructor(public loaderService: LoaderService) {}

  ngOnInit() {
    console.log(
      " ██████╗ ██████╗ \n",
      "██╔══██╗██╔══██╗\n",
      "██████╦╝██████╦╝\n",
      "██╔══██╗██╔══██╗\n",
      "██████╦╝██████╦╝\n",
      "╚═════╝ ╚═════╝ \n"
    );
  }
}
