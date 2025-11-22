import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PlateDataService } from '../../services/plate-data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-droplet-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './droplet-summary.component.html',
    styles: [
        `
            .summary-container {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #ccc;
                background-color: #f9f9f9;
            }
            .summary-item {
                margin-bottom: 5px;
            }
            .summary-label {
                font-weight: bold;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropletSummaryComponent {
    // dependencies
    private readonly plateDataService = inject(PlateDataService);

    // inputs
    threshold = input<number>(100);

    // component state
    private plateData = this.plateDataService.getPlateData();
    totalWellCount = computed(() => {
        const data = this.plateData();
        return data?.DropletInfo?.Wells?.length ?? 0;
    });
    lowDropletWellCount = computed(() => {
        const data = this.plateData();
        if (!data || !data.DropletInfo || !data.DropletInfo.Wells) {
            return 0;
        }
        return data.DropletInfo.Wells.filter((well) => well.DropletCount < this.threshold()).length;
    });
}
