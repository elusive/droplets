import { Injectable, Signal, signal } from '@angular/core';
import { PlateDropletInfo } from '@src/app/features/droplets/models/plate-droplet-info.model';
import { Plate } from '../models/plate.model';

@Injectable({
    providedIn: 'root',
})
export class PlateDataService {
    // dependencies
    private readonly errorService = inject(ErrorService);

    // state
    private plateData = signal<PlateDropletInfo | null>(null);

    // public methods
    getPlateData(): Signal<PlateDropletInfo | null> {
        return this.plateData.asReadonly();
    }

    /**
     * @description Loads plate well data from json file object.
     * @param {File} file
     * @returns {Promise<boolean>} True if load successful, false otherwise.
     */
    async loadPlateData(file: File | null = null): Promise<boolean> {
        if (file) {
            this.errorService.setErrorMessage(null); // clear any error

            const text = await file.text();
            const json = JSON.parse(text);

            if (!json || !json.PlateDropletInfo) {
                throw new Error('Invalid JSON structure: PlateDropletInfo not found.');
            }

            const plateDropletInfo = json.PlateDropletInfo;
            if (
                typeof plateDropletInfo.Version !== 'number' ||
                !plateDropletInfo.DropletInfo ||
                typeof plateDropletInfo.DropletInfo.Version !== 'number' ||
                !Array.isArray(plateDropletInfo.DropletInfo.Wells)
            ) {
                throw new Error(
                    'Invalid PlateDropletInfo format: Missing or incorrect properties.',
                );
            } else {
                this.plateData.set(plateDropletInfo);
                return true;
            }
        } else {
            this.plateData.set(null);
            return false;
        }
    }
}
