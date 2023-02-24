import { Injectable } from "@angular/core";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private pendingRequests: number = 0;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.addPendingRequest();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.removePendingRequest();
      }
    });
  }

  addPendingRequest() {
    this.pendingRequests++;
  }

  removePendingRequest() {
    this.pendingRequests--;
  }

  getLoading(): boolean {
    return this.pendingRequests > 0;
  }
}