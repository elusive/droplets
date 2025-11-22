import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { PlateComponent } from '../components/plate/plate.component';
import { DropletSummaryComponent } from '../components/droplet-summary/droplet-summary.component';
import { ThresholdInputComponent } from '../components/threshold-input/threshold-input.component';

@Component({
    selector: 'app-droplets',
    standalone: true,
    imports: [
        FileUploadComponent,
        PlateComponent,
        DropletSummaryComponent,
        ThresholdInputComponent,
    ],
    template: `
        <main>
            <app-file-upload></app-file-upload>
            <app-threshold-input
                [threshold]="threshold()"
                (thresholdChange)="onThresholdChange($event)"
            ></app-threshold-input>
            <app-droplet-summary [threshold]="threshold()"></app-droplet-summary>
            <app-plate [threshold]="threshold()"></app-plate>
        </main>
    `,
    styles: [
        `
            main {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 12px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropletsComponent {
    // constants
    private readonly MinimumThreshold = 0;
    private readonly MaximumThreshold = 500;

    // inputs
    threshold = signal<number>(100);

    onThresholdChange(newThreshold: number): void {
        if (newThreshold < this.MinimumThreshold || newThreshold > this.MaximumThreshold) {
            console.error(`Threshold ${newThreshold} not within valid range (0 - 500)`);
        }
        this.threshold.set(newThreshold);
    }
}
