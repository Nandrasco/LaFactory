import { Moment } from 'moment';
import { IFormateur } from 'app/shared/model//formateur.model';
import { IStagiaire } from 'app/shared/model//stagiaire.model';
import { ICursus } from 'app/shared/model//cursus.model';
import { IMatiere } from 'app/shared/model//matiere.model';

export interface IModule {
    id?: number;
    nom?: string;
    dateDebut?: Moment;
    dateFin?: Moment;
    formateurs?: IFormateur[];
    stagiaires?: IStagiaire[];
    cursuses?: ICursus[];
    matieres?: IMatiere[];
}

export class Module implements IModule {
    constructor(
        public id?: number,
        public nom?: string,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public formateurs?: IFormateur[],
        public stagiaires?: IStagiaire[],
        public cursuses?: ICursus[],
        public matieres?: IMatiere[]
    ) {}
}
