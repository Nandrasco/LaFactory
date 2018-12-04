import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITechnicien } from 'app/shared/model/technicien.model';
import { TechnicienService } from './technicien.service';
import { IAdresse } from 'app/shared/model/adresse.model';
import { AdresseService } from 'app/entities/adresse';

@Component({
    selector: 'jhi-technicien-update',
    templateUrl: './technicien-update.component.html'
})
export class TechnicienUpdateComponent implements OnInit {
    technicien: ITechnicien;
    isSaving: boolean;

    adresses: IAdresse[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private technicienService: TechnicienService,
        private adresseService: AdresseService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ technicien }) => {
            this.technicien = technicien;
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
        if (this.technicien.id !== undefined) {
            this.subscribeToSaveResponse(this.technicienService.update(this.technicien));
        } else {
            this.subscribeToSaveResponse(this.technicienService.create(this.technicien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITechnicien>>) {
        result.subscribe((res: HttpResponse<ITechnicien>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
