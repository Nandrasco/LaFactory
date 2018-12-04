import { IAdresse } from 'app/shared/model//adresse.model';

export interface IGestionnaire {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    adresse?: IAdresse;
}

export class Gestionnaire implements IGestionnaire {
    constructor(public id?: number, public nom?: string, public prenom?: string, public coordonnees?: string, public adresse?: IAdresse) {}
}
