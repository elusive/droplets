import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorService } from '@src/app/core/services/error.service';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '@src/app/core/layout/message.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, MessageComponent],
    template: `
        <app-message
            *ngIf="errorMessage() as msg"
            [message]="msg"
            (click)="clearError()"
        ></app-message>
        <router-outlet />
    `,
    styles: [
        `
            .app-message {
                position: absolute;
                bottom: 0rem;
                left: 1rem;
                right: 1rem;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        `,
    ],
})
export class App {
    // dependencies
    private errorService = inject(ErrorService);

    // state
    errorMessage = this.errorService.errorMessage ?? null;

    // methods
    clearError(): void {
        this.errorService.clearError();
    }
}
