import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
      <app-header></app-header>
      <app-spinner></app-spinner>
      <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "bb-store";

  constructor() {}

  ngOnInit() {
    console.log(" ██████╗ ██████╗ \n",
    "██╔══██╗██╔══██╗\n",
    "██████╦╝██████╦╝\n",
    "██╔══██╗██╔══██╗\n",
    "██████╦╝██████╦╝\n",
    "╚═════╝ ╚═════╝ \n");
  }
}

