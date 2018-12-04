import { ISalle } from 'app/shared/model//salle.model';
import { IOrdinateur } from 'app/shared/model//ordinateur.model';
import { IAdresse } from 'app/shared/model//adresse.model';
import { IMatiere } from 'app/shared/model//matiere.model';

export interface IStagiaire {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    salles?: ISalle[];
    ordinateur?: IOrdinateur;
    adresse?: IAdresse;
    matieres?: IMatiere[];
}

export class Stagiaire implements IStagiaire {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public coordonnees?: string,
        public salles?: ISalle[],
        public ordinateur?: IOrdinateur,
        public adresse?: IAdresse,
        public matieres?: IMatiere[]
    ) {}
}
