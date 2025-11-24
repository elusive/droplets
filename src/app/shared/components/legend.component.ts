import { Component, input } from '@angular/core';

@Component({
    selector: 'app-legend',
    template: `
        <legend>
            <span><ng-content /></span>
        </legend>
    `,
    styles: [
        `
            legend {
                background-color: var(--secondary);
                padding: 8px;
                border: 1px solid var(--primary);
                border-top: 0;
                color: var(--gray-700);
                text-align: center;
                font-size: 0.9rem;
            }
            legend > span {
                margin: 4px 4px 0px;
                font-weight: 500;
                font-size: inherit;
            }
        `,
    ],
})
export class LegendComponent {
    // inputs
    text = input<string>('');
}
