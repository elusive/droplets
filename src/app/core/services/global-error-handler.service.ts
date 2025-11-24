import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '@src/app/core/services/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const errorService = this.injector.get(ErrorService);

    let message = 'An unexpected error occurred.';
    if (error.message) {
      message = error.message;
    }

    errorService.logError(error);
    errorService.setError(message);
  }
}
