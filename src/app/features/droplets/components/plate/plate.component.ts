import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
    effect,
    input,
} from '@angular/core';
import { PlateDataService } from '@src/app/features/droplets/services/plate-data.service';
import { Well } from '@src/app/features/droplets/models/well.model';
import { CommonModule } from '@angular/common';
import { LegendComponent } from '@src/app/shared/components/legend.component';

@Component({
    selector: 'app-plate',
    standalone: true,
    imports: [CommonModule, LegendComponent],
    templateUrl: './plate.component.html',
    styleUrl: './plate.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlateComponent {
    // inputs
    threshold = input<number>(0);
    cellSize = 40;

    // dependencies
    private readonly plateDataService = inject(PlateDataService);

    // component state
    plateWells = signal<Well[]>([]);
    plateSize = signal<'48-well' | '96-well' | null>(null);
    currentThreshold = signal<number>(this.threshold());

    // computed state (readonly)
    columnLabels = computed(() => {
        if (this.plateSize() === '96-well') {
            return Array.from({ length: 12 }, (_, i) => i + 1);
        } else if (this.plateSize() === '48-well') {
            return Array.from({ length: 6 }, (_, i) => i + 1);
        }
        return [];
    });
    rowLabels = computed(() => Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i))); // A, B, C, ... H
    wellsByRow = computed(() => {
        const wells = this.plateWells();
        const wellsPerRow = this.columnLabels().length;
        const grouped: Well[][] = [];
        for (let i = 0; i < this.rowLabels().length; i++) {
            grouped.push(wells.slice(i * wellsPerRow, (i + 1) * wellsPerRow));
        }
        return grouped;
    });
    gridTemplateColumns = computed(() => {
        const numColumns = this.columnLabels().length;
        if (numColumns > 0) {
            // +1 for the row label column
            return `repeat(${numColumns + 1}, ${this.cellSize}px)`;
        }
        return '1fr'; // Default or empty state
    });

    constructor() {
        effect(() => {
            // call service to get signal for plateData and its value in one line
            const plateDropletInfo = this.plateDataService.getPlateData()();
            if (
                plateDropletInfo &&
                plateDropletInfo.DropletInfo &&
                plateDropletInfo.DropletInfo.Wells
            ) {
                const sortedWells = [...plateDropletInfo.DropletInfo.Wells].sort(
                    (a, b) => a.WellIndex - b.WellIndex,
                );
                this.plateWells.set(sortedWells);

                // Determine plate size
                if (sortedWells.length === 96) {
                    this.plateSize.set('96-well');
                } else if (sortedWells.length === 48) {
                    this.plateSize.set('48-well');
                } else {
                    this.plateSize.set(null); // Unknown size
                }
            } else {
                this.plateWells.set([]);
                this.plateSize.set(null);
            }
        });
    }

    isLowDroplet(dropletCount: number): boolean {
        return dropletCount < this.threshold();
    }
}
