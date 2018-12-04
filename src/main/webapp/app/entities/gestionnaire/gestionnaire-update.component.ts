import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';
import { IAdresse } from 'app/shared/model/adresse.model';
import { AdresseService } from 'app/entities/adresse';

@Component({
    selector: 'jhi-gestionnaire-update',
    templateUrl: './gestionnaire-update.component.html'
})
export class GestionnaireUpdateComponent implements OnInit {
    gestionnaire: IGestionnaire;
    isSaving: boolean;

    adresses: IAdresse[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gestionnaireService: GestionnaireService,
        private adresseService: AdresseService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gestionnaire }) => {
            this.gestionnaire = gestionnaire;
        });
        this.adresseService.query().subscribe(
            (res: HttpResponse<IAdresse[]>) => {
                this.adresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gestionnaire.id !== undefined) {
            this.subscribeToSaveResponse(this.gestionnaireService.update(this.gestionnaire));
        } else {
            this.subscribeToSaveResponse(this.gestionnaireService.create(this.gestionnaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGestionnaire>>) {
        result.subscribe((res: HttpResponse<IGestionnaire>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAdresseById(index: number, item: IAdresse) {
        return item.id;
    }
}
