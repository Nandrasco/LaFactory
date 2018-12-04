import { IOrdinateur } from 'app/shared/model//ordinateur.model';
import { IAdresse } from 'app/shared/model//adresse.model';
import { IMatiere } from 'app/shared/model//matiere.model';
import { IModule } from 'app/shared/model//module.model';

export interface IStagiaire {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    ordinateur?: IOrdinateur;
    adresse?: IAdresse;
    matieres?: IMatiere[];
    modules?: IModule[];
}

export class Stagiaire implements IStagiaire {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public coordonnees?: string,
        public ordinateur?: IOrdinateur,
        public adresse?: IAdresse,
        public matieres?: IMatiere[],
        public modules?: IModule[]
    ) {}
}
