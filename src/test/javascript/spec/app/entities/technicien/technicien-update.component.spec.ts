/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LaFactoryTestModule } from '../../../test.module';
import { TechnicienUpdateComponent } from 'app/entities/technicien/technicien-update.component';
import { TechnicienService } from 'app/entities/technicien/technicien.service';
import { Technicien } from 'app/shared/model/technicien.model';

describe('Component Tests', () => {
    describe('Technicien Management Update Component', () => {
        let comp: TechnicienUpdateComponent;
        let fixture: ComponentFixture<TechnicienUpdateComponent>;
        let service: TechnicienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LaFactoryTestModule],
                declarations: [TechnicienUpdateComponent]
            })
                .overrideTemplate(TechnicienUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TechnicienUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnicienService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Technicien(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.technicien = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Technicien();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.technicien = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
