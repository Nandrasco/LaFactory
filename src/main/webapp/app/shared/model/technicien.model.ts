import { IAdresse } from 'app/shared/model//adresse.model';

export interface ITechnicien {
    id?: number;
    nom?: string;
    prenom?: string;
    coordonnees?: string;
    adresse?: IAdresse;
}

export class Technicien implements ITechnicien {
    constructor(public id?: number, public nom?: string, public prenom?: string, public coordonnees?: string, public adresse?: IAdresse) {}
}
