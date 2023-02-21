import { Component } from "@angular/core";
import { LoadingService } from "src/services/loading.service";

@Component({
  selector: "app-root",
  template: `
    <div class="wrapper" [ngClass] = "{'noclick': loading$ | async}">
      <app-header></app-header>
      <router-outlet></router-outlet>
      <div class="overlay" *ngIf="loading$ | async">
        <div class="spinner-wrapper">
          <mat-progress-spinner
            [mode]="'indeterminate'"
            class="test"
          ></mat-progress-spinner>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "bb-store";
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService) {}

  ngOnInit() {
    console.log(" ██████╗ ██████╗ \n",
    "██╔══██╗██╔══██╗\n",
    "██████╦╝██████╦╝\n",
    "██╔══██╗██╔══██╗\n",
    "██████╦╝██████╦╝\n",
    "╚═════╝ ╚═════╝ \n");
  }
}

