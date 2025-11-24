import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
    signal,
    ViewChild,
} from '@angular/core';
import { PlateDataService } from '@src/app/features/droplets/services/plate-data.service';
import { CommonModule } from '@angular/common';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'file-upload.component.html',
    styleUrl: 'file-upload.component.css',
})
export class FileUploadComponent {
    // dependecies
    private readonly plateDataService = inject(PlateDataService);

    // children refs
    @ViewChild('fileInput') fileInput!: ElementRef;

    // inputs
    title = input<string>('Select Plate Data File: ');
    subTitle = input<string>('Accepts JSON up to 1MB');
    fileType = input<string>('.json');

    // component state
    status = signal<UploadStatus>('idle');
    selectedFile = signal<File | null>(null);
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    // event handling
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile.set(input.files[0]);
        } else {
            this.selectedFile.set(null);
        }
    }

    async onLoadClick(): Promise<void> {
        try {
            const file = this.selectedFile();
            if (file) {
                this.status.set('uploading');
                await this.plateDataService.loadPlateData(file);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                this.errorMessage.set(e.message);
            } else {
                this.errorMessage.set(String(e));
            }
            this.status.set('error');
            throw new Error(`Failed to load plate data file: ${this.errorMessage()}`);
        }
    }

    reset() {
        this.selectedFile.set(null);
        this.fileInput.nativeElement.value = null;
        this.plateDataService.loadPlateData();
        this.status.set('idle');
    }
}
