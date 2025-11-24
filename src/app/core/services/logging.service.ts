import { Injectable } from '@angular/core';
import { LogLevel } from '@src/app/core/models/log-level.enum';

/**
 * Service class to handle centralized logging of messages.
 * @description This class offers a single point of logging
 * that uses a {LogLevel} enumeration to output the console.
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class LoggingService {
    /**
     * @description Logs the provided message at the indicated level.
     * @param {LogLevel} level
     * @param {string}   message
     * @param {Error}    error
     */
    log(level: LogLevel, message: string, error?: any): void {
        switch (level) {
            case LogLevel.DEBUG:
                this.debug(message);
                break;
            case LogLevel.INFO:
                this.info(message);
                break;
            case LogLevel.WARN:
                this.warn(message);
                break;
            case LogLevel.ERROR:
                this.error(message, error);
                break;
        }
    }

    private debug(message: string): void {
        console.debug(message);
    }

    private info(message: string): void {
        console.info(message);
    }

    private warn(message: string): void {
        console.warn(message);
    }

    private error(message: string, error?: any): void {
        console.error(message, error);
    }
}
