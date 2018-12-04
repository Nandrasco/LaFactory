import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LaFactorySharedModule } from 'app/shared';
import {
    ProjecteurComponent,
    ProjecteurDetailComponent,
    ProjecteurUpdateComponent,
    ProjecteurDeletePopupComponent,
    ProjecteurDeleteDialogComponent,
    projecteurRoute,
    projecteurPopupRoute
} from './';

const ENTITY_STATES = [...projecteurRoute, ...projecteurPopupRoute];

@NgModule({
    imports: [LaFactorySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProjecteurComponent,
        ProjecteurDetailComponent,
        ProjecteurUpdateComponent,
        ProjecteurDeleteDialogComponent,
        ProjecteurDeletePopupComponent
    ],
    entryComponents: [ProjecteurComponent, ProjecteurUpdateComponent, ProjecteurDeleteDialogComponent, ProjecteurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryProjecteurModule {}
