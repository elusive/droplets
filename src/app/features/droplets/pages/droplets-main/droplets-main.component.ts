import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FileUploadComponent } from '@src/app/shared/components/file-upload/file-upload.component';
import { PlateComponent } from '@src/app/features/droplets/components/plate/plate.component';
import { DropletSummaryComponent } from '@src/app/features/droplets/components/droplet-summary/droplet-summary.component';
import { ThresholdInputComponent } from '@src/app/features/droplets/components/threshold-input/threshold-input.component';
import { HeaderComponent } from '@src/app/core/layout/header.component';
import { FooterComponent } from '@src/app/core/layout/footer.component';

@Component({
    selector: 'app-droplets',
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        FileUploadComponent,
        PlateComponent,
        DropletSummaryComponent,
        ThresholdInputComponent,
    ],
    templateUrl: 'droplets-main.component.html',
    styleUrl: 'droplets-main.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropletsComponent {
    // constants
    private readonly MinimumThreshold = 0;
    private readonly MaximumThreshold = 500;

    // inputs
    threshold = signal<number>(100);

    // event handling
    onThresholdChange(newThreshold: number): void {
        if (newThreshold < this.MinimumThreshold || newThreshold > this.MaximumThreshold) {
            console.error(`Threshold ${newThreshold} not within valid range (0 - 500)`);
        }
        this.threshold.set(newThreshold);
    }
}
