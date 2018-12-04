import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from './stagiaire.service';
import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from 'app/entities/salle';
import { IOrdinateur } from 'app/shared/model/ordinateur.model';
import { OrdinateurService } from 'app/entities/ordinateur';
import { IAdresse } from 'app/shared/model/adresse.model';
import { AdresseService } from 'app/entities/adresse';
import { IMatiere } from 'app/shared/model/matiere.model';
import { MatiereService } from 'app/entities/matiere';

@Component({
    selector: 'jhi-stagiaire-update',
    templateUrl: './stagiaire-update.component.html'
})
export class StagiaireUpdateComponent implements OnInit {
    stagiaire: IStagiaire;
    isSaving: boolean;

    salles: ISalle[];

    ordinateurs: IOrdinateur[];

    adresses: IAdresse[];

    matieres: IMatiere[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private stagiaireService: StagiaireService,
        private salleService: SalleService,
        private ordinateurService: OrdinateurService,
        private adresseService: AdresseService,
        private matiereService: MatiereService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stagiaire }) => {
            this.stagiaire = stagiaire;
        });
        this.salleService.query().subscribe(
            (res: HttpResponse<ISalle[]>) => {
                this.salles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ordinateurService.query().subscribe(
            (res: HttpResponse<IOrdinateur[]>) => {
                this.ordinateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.adresseService.query().subscribe(
            (res: HttpResponse<IAdresse[]>) => {
                this.adresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.matiereService.query().subscribe(
            (res: HttpResponse<IMatiere[]>) => {
                this.matieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stagiaire.id !== undefined) {
            this.subscribeToSaveResponse(this.stagiaireService.update(this.stagiaire));
        } else {
            this.subscribeToSaveResponse(this.stagiaireService.create(this.stagiaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStagiaire>>) {
        result.subscribe((res: HttpResponse<IStagiaire>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSalleById(index: number, item: ISalle) {
        return item.id;
    }

    trackOrdinateurById(index: number, item: IOrdinateur) {
        return item.id;
    }

    trackAdresseById(index: number, item: IAdresse) {
        return item.id;
    }

    trackMatiereById(index: number, item: IMatiere) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
