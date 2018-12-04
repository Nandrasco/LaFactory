import { IFormateur } from 'app/shared/model//formateur.model';
import { IStagiaire } from 'app/shared/model//stagiaire.model';
import { IModule } from 'app/shared/model//module.model';

export interface IMatiere {
    id?: number;
    nom?: string;
    formateurs?: IFormateur[];
    stagiaires?: IStagiaire[];
    modules?: IModule[];
}

export class Matiere implements IMatiere {
    constructor(
        public id?: number,
        public nom?: string,
        public formateurs?: IFormateur[],
        public stagiaires?: IStagiaire[],
        public modules?: IModule[]
    ) {}
}
