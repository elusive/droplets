import { TestBed } from '@angular/core/testing';
import { PlateDataService } from './plate-data.service';
import { PlateDropletInfo } from '../models/plate-droplet-info.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PlateDataService', () => {
    let service: PlateDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PlateDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load and get plate data from a valid file', async () => {
        // arrange
        const mockPlateDropletInfo: PlateDropletInfo = {
            Version: 1,
            DropletInfo: {
                Version: 1,
                Wells: [
                    { WellName: 'A1', WellIndex: 0, DropletCount: 100 },
                    { WellName: 'B1', WellIndex: 1, DropletCount: 200 },
                ],
            },
        };
        const mockPlateData = {
            PlateDropletInfo: mockPlateDropletInfo,
        };
        const jsonString = JSON.stringify(mockPlateData);
        const mockFile = {
            name: 'plate.json',
            size: jsonString.length,
            type: 'application/json',
            text: () => Promise.resolve(jsonString), // had to mock the .text() method
        } as File;

        // act
        const succeeded = await service.loadPlateData(mockFile);

        // assert
        expect(succeeded).toBe(true);
        const actual = service.getPlateData()();
        expect(actual).toEqual(mockPlateDropletInfo);
    });

    it('should handle invalid JSON file', async () => {
        // arrange
        const file = new File(['invalid json'], 'invalid.json');

        // act & assert
        service.loadPlateData(file).catch((e) => expect(e).toBeInstanceOf(Error));
        const plateData = service.getPlateData()();

        // assert
        expect(plateData).toBeNull();
    });

    it('should handle JSON with invalid structure', async () => {
        // arrange
        const invalidData = { foo: 'bar' };
        const jsonString = JSON.stringify(invalidData);
        const mockFile = {
            name: 'plate.json',
            size: jsonString.length,
            type: 'application/json',
            text: () => Promise.resolve(jsonString), // Mock the .text() method
        } as unknown as File; // Cast to File to satisfy TypeScript

        // act & assert
        service.loadPlateData(mockFile).catch((e) => expect(e).toBeInstanceOf(Error));

        // assert
        const plateData = service.getPlateData()();
        expect(plateData).toBeNull();
    });
});
