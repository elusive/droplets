import { Component, input } from '@angular/core';

@Component({
    selector: 'app-message',
    imports: [],
    template: `
        <div class="message">
            <p class="error">{{ message() }}</p>
        </div>
    `,
    styles: [
        `
            .message {
                padding: 10px;
                color: var(--error-text);
                background-color: var(--error-bg);
                border: 1px solid #f5c6cb;
            }
        `,
    ],
})
export class MessageComponent {
    message = input<string>('');
}
