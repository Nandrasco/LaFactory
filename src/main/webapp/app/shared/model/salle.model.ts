import { Moment } from 'moment';
import { IProjecteur } from 'app/shared/model//projecteur.model';
import { IFormateur } from 'app/shared/model//formateur.model';
import { IStagiaire } from 'app/shared/model//stagiaire.model';

export interface ISalle {
    id?: number;
    code?: string;
    cout?: number;
    dispo?: boolean;
    dateDebut?: Moment;
    dateFin?: Moment;
    capaciteMax?: number;
    projecteur?: IProjecteur;
    formateurs?: IFormateur[];
    stagiaires?: IStagiaire[];
}

export class Salle implements ISalle {
    constructor(
        public id?: number,
        public code?: string,
        public cout?: number,
        public dispo?: boolean,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public capaciteMax?: number,
        public projecteur?: IProjecteur,
        public formateurs?: IFormateur[],
        public stagiaires?: IStagiaire[]
    ) {
        this.dispo = this.dispo || false;
    }
}
