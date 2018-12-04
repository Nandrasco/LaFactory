import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISalle } from 'app/shared/model/salle.model';

type EntityResponseType = HttpResponse<ISalle>;
type EntityArrayResponseType = HttpResponse<ISalle[]>;

@Injectable({ providedIn: 'root' })
export class SalleService {
    public resourceUrl = SERVER_API_URL + 'api/salles';

    constructor(private http: HttpClient) {}

    create(salle: ISalle): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(salle);
        return this.http
            .post<ISalle>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(salle: ISalle): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(salle);
        return this.http
            .put<ISalle>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISalle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISalle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(salle: ISalle): ISalle {
        const copy: ISalle = Object.assign({}, salle, {
            dateDebut: salle.dateDebut != null && salle.dateDebut.isValid() ? salle.dateDebut.format(DATE_FORMAT) : null,
            dateFin: salle.dateFin != null && salle.dateFin.isValid() ? salle.dateFin.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
            res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((salle: ISalle) => {
                salle.dateDebut = salle.dateDebut != null ? moment(salle.dateDebut) : null;
                salle.dateFin = salle.dateFin != null ? moment(salle.dateFin) : null;
            });
        }
        return res;
    }
}
