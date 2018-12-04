import { Moment } from 'moment';
import { IStagiaire } from 'app/shared/model//stagiaire.model';

export interface IOrdinateur {
    id?: number;
    code?: string;
    cout?: number;
    dispo?: boolean;
    dateDebut?: Moment;
    dateFin?: Moment;
    processeur?: string;
    ram?: number;
    dd?: number;
    dateAchat?: Moment;
    stagiaire?: IStagiaire;
}

export class Ordinateur implements IOrdinateur {
    constructor(
        public id?: number,
        public code?: string,
        public cout?: number,
        public dispo?: boolean,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public processeur?: string,
        public ram?: number,
        public dd?: number,
        public dateAchat?: Moment,
        public stagiaire?: IStagiaire
    ) {
        this.dispo = this.dispo || false;
    }
}