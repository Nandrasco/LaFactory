import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjecteur } from 'app/shared/model/projecteur.model';

type EntityResponseType = HttpResponse<IProjecteur>;
type EntityArrayResponseType = HttpResponse<IProjecteur[]>;

@Injectable({ providedIn: 'root' })
export class ProjecteurService {
    public resourceUrl = SERVER_API_URL + 'api/projecteurs';

    constructor(private http: HttpClient) {}

    create(projecteur: IProjecteur): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(projecteur);
        return this.http
            .post<IProjecteur>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(projecteur: IProjecteur): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(projecteur);
        return this.http
            .put<IProjecteur>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProjecteur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProjecteur[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(projecteur: IProjecteur): IProjecteur {
        const copy: IProjecteur = Object.assign({}, projecteur, {
            dateDebut: projecteur.dateDebut != null && projecteur.dateDebut.isValid() ? projecteur.dateDebut.format(DATE_FORMAT) : null,
            dateFin: projecteur.dateFin != null && projecteur.dateFin.isValid() ? projecteur.dateFin.format(DATE_FORMAT) : null
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
            res.body.forEach((projecteur: IProjecteur) => {
                projecteur.dateDebut = projecteur.dateDebut != null ? moment(projecteur.dateDebut) : null;
                projecteur.dateFin = projecteur.dateFin != null ? moment(projecteur.dateFin) : null;
            });
        }
        return res;
    }
}
