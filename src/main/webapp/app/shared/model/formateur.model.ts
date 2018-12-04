import { ISalle } from 'app/shared/model//salle.model';
import { IAdresse } from 'app/shared/model//adresse.model';
import { IMatiere } from 'app/shared/model//matiere.model';
import { IModule } from 'app/shared/model//module.model';

export const enum Niveau {
    DEBUTANT = 'DEBUTANT',
    INTERMERDIAIRE = 'INTERMERDIAIRE',
    AVANCE = 'AVANCE',
    EXPERT = 'EXPERT'
}

export interface IFormateur {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    niveau?: Niveau;
    salles?: ISalle[];
    adresse?: IAdresse;
    matieres?: IMatiere[];
    modules?: IModule[];
}

export class Formateur implements IFormateur {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public coordonnees?: string,
        public niveau?: Niveau,
        public salles?: ISalle[],
        public adresse?: IAdresse,
        public matieres?: IMatiere[],
        public modules?: IModule[]
    ) {}
}
