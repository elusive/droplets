import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';
import { LogLevel } from '../models/log-level.enum';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LoggingService', () => {
    let service: LoggingService;
    let consoleSpy: Record<string, ReturnType<typeof vi.spyOn>>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoggingService);

        consoleSpy = {
            debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
            info: vi.spyOn(console, 'info').mockImplementation(() => {}),
            warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
            error: vi.spyOn(console, 'error').mockImplementation(() => {}),
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should log DEBUG messages to console.log', () => {
        const message = 'Debug message';
        service.log(LogLevel.DEBUG, message);
        expect(consoleSpy['debug']).toHaveBeenCalledWith(message);
    });

    it('should log INFO messages to console.info', () => {
        const message = 'Info message';
        service.log(LogLevel.INFO, message);
        expect(consoleSpy['info']).toHaveBeenCalledWith(message);
    });

    it('should log WARN messages to console.warn', () => {
        const message = 'Warning message';
        service.log(LogLevel.WARN, message);
        expect(consoleSpy['warn']).toHaveBeenCalledWith(message);
    });

    it('should log ERROR messages to console.error', () => {
        const message = 'Error message';
        const error = new Error('Test error');
        service.log(LogLevel.ERROR, message, error);
        expect(consoleSpy['error']).toHaveBeenCalledWith(message, error);
    });
});
