import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private pendingRequests: number = 0;

  constructor() {}

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