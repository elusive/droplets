import { Injectable, signal } from '@angular/core';
import { PlateDropletInfo } from '../models/plate-droplet-info.model';

@Injectable({
    providedIn: 'root',
})
export class PlateDataService {
    private plateData = signal<PlateDropletInfo | null>(null);

    getPlateData() {
        return this.plateData.asReadonly();
    }

    loadPlateData(file: File): void {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = reader.result as string;
                const json = JSON.parse(text);
                this.plateData.set(json?.PlateDropletInfo);
            } catch (error) {
                console.error('Error parsing plate data file:', error);
                this.plateData.set(null);
            }
        };
        reader.onerror = (e) => {
            console.error('Error reading file:', e);
            this.plateData.set(null);
        };

        reader.readAsText(file);
    }
}
