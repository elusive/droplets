import { Injectable, signal, inject } from '@angular/core';
import { LoggingService } from './logging.service';
import { LogLevel } from '@src/app/core/models/log-level.enum';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    // dependencies
    private readonly loggingService = inject(LoggingService);

    // state
    private _errorMessage = signal<string | null>(null);

    // public signals
    errorMessage = this._errorMessage.asReadonly();

    // public methods
    logError(error: any): void {
        this.loggingService.log(LogLevel.ERROR, 'An error occurred:', error);
    }

    setError(message: string): void {
        this._errorMessage.set(message);
    }

    clearError(): void {
        this._errorMessage.set(null);
    }
}
