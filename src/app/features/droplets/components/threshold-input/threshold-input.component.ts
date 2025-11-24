import { ChangeDetectionStrategy, Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-threshold-input',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: 'threshold-input.component.html',
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
    constructor() {
        effect(() => {
            this.inputValue.set(this.threshold());
        });
    }

    // inputs
    threshold = input<number>(100);

    // outputs
    thresholdChange = output<number>();

    // component state
    inputValue = signal<number>(this.threshold());

    // event handling
    onUpdateClick(): void {
        this.thresholdChange.emit(this.inputValue());
    }
}
