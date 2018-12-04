import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from './salle.service';
import { IProjecteur } from 'app/shared/model/projecteur.model';
import { ProjecteurService } from 'app/entities/projecteur';
import { IFormateur } from 'app/shared/model/formateur.model';
import { FormateurService } from 'app/entities/formateur';
import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from 'app/entities/stagiaire';

@Component({
    selector: 'jhi-salle-update',
    templateUrl: './salle-update.component.html'
})
export class SalleUpdateComponent implements OnInit {
    salle: ISalle;
    isSaving: boolean;

    projecteurs: IProjecteur[];

    formateurs: IFormateur[];

    stagiaires: IStagiaire[];
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private salleService: SalleService,
        private projecteurService: ProjecteurService,
        private formateurService: FormateurService,
        private stagiaireService: StagiaireService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ salle }) => {
            this.salle = salle;
        });
        this.projecteurService.query().subscribe(
            (res: HttpResponse<IProjecteur[]>) => {
                this.projecteurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formateurService.query().subscribe(
            (res: HttpResponse<IFormateur[]>) => {
                this.formateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.stagiaireService.query().subscribe(
            (res: HttpResponse<IStagiaire[]>) => {
                this.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.salle.id !== undefined) {
            this.subscribeToSaveResponse(this.salleService.update(this.salle));
        } else {
            this.subscribeToSaveResponse(this.salleService.create(this.salle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalle>>) {
        result.subscribe((res: HttpResponse<ISalle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjecteurById(index: number, item: IProjecteur) {
        return item.id;
    }

    trackFormateurById(index: number, item: IFormateur) {
        return item.id;
    }

    trackStagiaireById(index: number, item: IStagiaire) {
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
