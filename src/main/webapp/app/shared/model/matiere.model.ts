import { IFormateur } from 'app/shared/model//formateur.model';
import { IStagiaire } from 'app/shared/model//stagiaire.model';
import { IModule } from 'app/shared/model//module.model';

export const enum Niveau {
    DEBUTANT = 'DEBUTANT',
    INTERMERDIAIRE = 'INTERMERDIAIRE',
    AVANCE = 'AVANCE',
    EXPERT = 'EXPERT'
}

export interface IMatiere {
    id?: number;
    nom?: string;
    niveau?: Niveau;
    formateurs?: IFormateur[];
    stagiaires?: IStagiaire[];
    modules?: IModule[];
}

export class Matiere implements IMatiere {
    constructor(
        public id?: number,
        public nom?: string,
        public niveau?: Niveau,
        public formateurs?: IFormateur[],
        public stagiaires?: IStagiaire[],
        public modules?: IModule[]
    ) {}
}
