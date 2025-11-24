import { Well } from '@src/app/features/droplets/models/well.model';

export interface DropletInfo {
    Version: number;
    Wells: Well[];
}
