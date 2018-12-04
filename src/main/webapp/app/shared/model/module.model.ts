import { IStagiaire } from 'app/shared/model//stagiaire.model';
import { IFormateur } from 'app/shared/model//formateur.model';
import { IMatiere } from 'app/shared/model//matiere.model';

export interface IModule {
    id?: number;
    nom?: string;
    stagiaires?: IStagiaire;
    formateurs?: IFormateur[];
    matieres?: IMatiere[];
}

export class Module implements IModule {
    constructor(
        public id?: number,
        public nom?: string,
        public stagiaires?: IStagiaire,
        public formateurs?: IFormateur[],
        public matieres?: IMatiere[]
    ) {}
}
