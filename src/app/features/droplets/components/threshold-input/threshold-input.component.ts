import { ChangeDetectionStrategy, Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-threshold-input',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
        <div class="threshold-container">
            <label for="threshold">Change Threshold:</label>
            <input
                id="threshold"
                type="number"
                min="0"
                max="500"
                class="threshold-input"
                [ngModel]="inputValue()"
                (ngModelChange)="inputValue.set($event)"
            />
            <button (click)="onUpdateClick()">Update</button>
        </div>
    `,
    styles: [
        `
            .threshold-container {
                margin-top: 20px;
            }
            .threshold-input {
                width: 60px;
                margin-right: 10px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThresholdInputComponent {
    // inputs
    threshold = input<number>(100);

    // outputs
    thresholdChange = output<number>();

    // component state
    inputValue = signal<number>(this.threshold());

    constructor() {
        effect(() => {
            this.inputValue.set(this.threshold());
        });
    }

    onUpdateClick(): void {
        this.thresholdChange.emit(this.inputValue());
    }
}
