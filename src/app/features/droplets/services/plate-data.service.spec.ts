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
    const mockPlateData: PlateDropletInfo = {
      Version: 1,
      DropletInfo: {
        Version: '1.0',
        Wells: [
          { WellName: 'A1', WellIndex: 0, DropletCount: 100 },
          { WellName: 'B1', WellIndex: 1, DropletCount: 200 },
        ],
      },
    };
    const blob = new Blob([JSON.stringify(mockPlateData)], { type: 'application/json' });
    const file = new File([blob], 'plate.json');

    service.loadPlateData(file);

    await new Promise(resolve => setTimeout(resolve, 100)); // wait for file reader

    const plateData = service.getPlateData()();
    expect(plateData).toEqual(mockPlateData);
  });

  it('should handle invalid JSON file', async () => {
    const file = new File(['invalid json'], 'invalid.json');

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    service.loadPlateData(file);

    await new Promise(resolve => setTimeout(resolve, 100));

    const plateData = service.getPlateData()();
    expect(plateData).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should handle JSON with invalid structure', async () => {
    const invalidData = { foo: 'bar' };
    const blob = new Blob([JSON.stringify(invalidData)], { type: 'application/json' });
    const file = new File([blob], 'invalid-structure.json');

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    service.loadPlateData(file);

    await new Promise(resolve => setTimeout(resolve, 100));

    const plateData = service.getPlateData()();
    expect(plateData).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error parsing plate data file:', new Error('Invalid PlateDropletInfo JSON structure'));
    consoleSpy.mockRestore();
  });
});
