import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { PlateDataService } from '../../../features/droplets/services/plate-data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="file-upload-container">
            <label for="file-upload">Select Plate Droplet Info File:</label>
            <input
                (change)="onFileSelected($event)"
                id="file-upload"
                class="file-input"
                type="file"
                accept=".json"
            />
            <button (click)="onLoadClick()" [disabled]="!selectedFile()">Load</button>
        </div>
        @if (errorMessage()) {
            <p class="error">{{ errorMessage() }}</p>
        }
        @if (successMessage()) {
            <p class="success">{{ successMessage() }}</p>
        }
    `,
    styles: [
        `
            .file-upload-container {
                margin: 1rem;
                font-family: sans-serif;
            }
        `,
    ],
})
export class FileUploadComponent {
    // dependecies
    private readonly plateDataService = inject(PlateDataService);

    // inputs
    label = input<string>('Select Plate Data File: ');
    fileType = input<string>('.json');

    // component state
    selectedFile = signal<File | null>(null);
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile.set(input.files[0]);
        } else {
            this.selectedFile.set(null);
        }
    }

    onLoadClick(): void {
        try {
            const file = this.selectedFile();
            if (file) {
                this.plateDataService.loadPlateData(file);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                this.errorMessage.set(e.message);
            } else {
                this.errorMessage.set(String(e));
            }
        }
    }
}
