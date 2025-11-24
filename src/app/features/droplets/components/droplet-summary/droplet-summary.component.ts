import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PlateDataService } from '@src/app/features/droplets/services/plate-data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-droplet-summary',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (totalWellCount() > 0) {
            <div class="summary-container">
                <div>
                    <span class="summary-label label">Well Count:</span>
                    <span>{{ totalWellCount() }}</span>
                </div>
                <div>
                    <span class="summary-label label">Low-Droplet Well Count:</span>
                    <span>{{ lowDropletWellCount() }}</span>
                </div>
            </div>
        }
    `,
    styles: [
        `
            .summary-container {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                gap: 20px;
                margin: 10px 40px;
            }
            .summary-label {
                color: var(--text-dark);
                font-weight: bold;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropletSummaryComponent {
    // dependencies
    private readonly plateDataService = inject(PlateDataService);
    private plateData = this.plateDataService.getPlateData();

    // inputs
    threshold = input<number>(100);

    // component state
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
