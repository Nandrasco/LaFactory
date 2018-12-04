import { Moment } from 'moment';
import { ISalle } from 'app/shared/model//salle.model';
import { IModule } from 'app/shared/model//module.model';

export interface ICursus {
    id?: number;
    nom?: string;
    dateDebut?: Moment;
    dateFin?: Moment;
    salle?: ISalle;
    modules?: IModule[];
}

export class Cursus implements ICursus {
    constructor(
        public id?: number,
        public nom?: string,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public salle?: ISalle,
        public modules?: IModule[]
    ) {}
}
