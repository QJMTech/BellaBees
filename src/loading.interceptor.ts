import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "./services/loader.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // TODO: Add your interceptor logic here

    // Pass the request along to the next interceptor or the backend
    return next.handle(req);
  }
}
