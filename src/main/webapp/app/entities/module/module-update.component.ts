import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { IFormateur } from 'app/shared/model/formateur.model';
import { FormateurService } from 'app/entities/formateur';
import { IStagiaire } from 'app/shared/model/stagiaire.model';
import { StagiaireService } from 'app/entities/stagiaire';
import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from 'app/entities/cursus';
import { IMatiere } from 'app/shared/model/matiere.model';
import { MatiereService } from 'app/entities/matiere';

@Component({
    selector: 'jhi-module-update',
    templateUrl: './module-update.component.html'
})
export class ModuleUpdateComponent implements OnInit {
    module: IModule;
    isSaving: boolean;

    formateurs: IFormateur[];

    stagiaires: IStagiaire[];

    cursuses: ICursus[];

    matieres: IMatiere[];
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private moduleService: ModuleService,
        private formateurService: FormateurService,
        private stagiaireService: StagiaireService,
        private cursusService: CursusService,
        private matiereService: MatiereService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ module }) => {
            this.module = module;
        });
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
        this.cursusService.query().subscribe(
            (res: HttpResponse<ICursus[]>) => {
                this.cursuses = res.body;
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
        if (this.module.id !== undefined) {
            this.subscribeToSaveResponse(this.moduleService.update(this.module));
        } else {
            this.subscribeToSaveResponse(this.moduleService.create(this.module));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>) {
        result.subscribe((res: HttpResponse<IModule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFormateurById(index: number, item: IFormateur) {
        return item.id;
    }

    trackStagiaireById(index: number, item: IStagiaire) {
        return item.id;
    }

    trackCursusById(index: number, item: ICursus) {
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
