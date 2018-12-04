import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAdresse } from 'app/shared/model/adresse.model';
import { AdresseService } from './adresse.service';
import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from 'app/entities/stagiaire';
import { IFormateur } from 'app/shared/model/formateur.model';
import { FormateurService } from 'app/entities/formateur';
import { ITechnicien } from 'app/shared/model/technicien.model';
import { TechnicienService } from 'app/entities/technicien';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire';

@Component({
    selector: 'jhi-adresse-update',
    templateUrl: './adresse-update.component.html'
})
export class AdresseUpdateComponent implements OnInit {
    adresse: IAdresse;
    isSaving: boolean;

    stagiaires: IStagiaire[];

    formateurs: IFormateur[];

    techniciens: ITechnicien[];

    gestionnaires: IGestionnaire[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private adresseService: AdresseService,
        private stagiaireService: StagiaireService,
        private formateurService: FormateurService,
        private technicienService: TechnicienService,
        private gestionnaireService: GestionnaireService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ adresse }) => {
            this.adresse = adresse;
        });
        this.stagiaireService.query({ filter: 'adresse-is-null' }).subscribe(
            (res: HttpResponse<IStagiaire[]>) => {
                if (!this.adresse.stagiaire || !this.adresse.stagiaire.id) {
                    this.stagiaires = res.body;
                } else {
                    this.stagiaireService.find(this.adresse.stagiaire.id).subscribe(
                        (subRes: HttpResponse<IStagiaire>) => {
                            this.stagiaires = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formateurService.query({ filter: 'adresse-is-null' }).subscribe(
            (res: HttpResponse<IFormateur[]>) => {
                if (!this.adresse.formateur || !this.adresse.formateur.id) {
                    this.formateurs = res.body;
                } else {
                    this.formateurService.find(this.adresse.formateur.id).subscribe(
                        (subRes: HttpResponse<IFormateur>) => {
                            this.formateurs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.technicienService.query({ filter: 'adresse-is-null' }).subscribe(
            (res: HttpResponse<ITechnicien[]>) => {
                if (!this.adresse.technicien || !this.adresse.technicien.id) {
                    this.techniciens = res.body;
                } else {
                    this.technicienService.find(this.adresse.technicien.id).subscribe(
                        (subRes: HttpResponse<ITechnicien>) => {
                            this.techniciens = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gestionnaireService.query({ filter: 'adresse-is-null' }).subscribe(
            (res: HttpResponse<IGestionnaire[]>) => {
                if (!this.adresse.gestionnaire || !this.adresse.gestionnaire.id) {
                    this.gestionnaires = res.body;
                } else {
                    this.gestionnaireService.find(this.adresse.gestionnaire.id).subscribe(
                        (subRes: HttpResponse<IGestionnaire>) => {
                            this.gestionnaires = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.adresse.id !== undefined) {
            this.subscribeToSaveResponse(this.adresseService.update(this.adresse));
        } else {
            this.subscribeToSaveResponse(this.adresseService.create(this.adresse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAdresse>>) {
        result.subscribe((res: HttpResponse<IAdresse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStagiaireById(index: number, item: IStagiaire) {
        return item.id;
    }

    trackFormateurById(index: number, item: IFormateur) {
        return item.id;
    }

    trackTechnicienById(index: number, item: ITechnicien) {
        return item.id;
    }

    trackGestionnaireById(index: number, item: IGestionnaire) {
        return item.id;
    }
}
