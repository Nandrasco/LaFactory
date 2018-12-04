import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LaFactoryFormateurModule } from './formateur/formateur.module';
import { LaFactoryStagiaireModule } from './stagiaire/stagiaire.module';
import { LaFactoryAdresseModule } from './adresse/adresse.module';
import { LaFactoryTechnicienModule } from './technicien/technicien.module';
import { LaFactoryGestionnaireModule } from './gestionnaire/gestionnaire.module';
import { LaFactoryModuleModule } from './module/module.module';
import { LaFactoryMatiereModule } from './matiere/matiere.module';
import { LaFactoryOrdinateurModule } from './ordinateur/ordinateur.module';
import { LaFactoryProjecteurModule } from './projecteur/projecteur.module';
import { LaFactorySalleModule } from './salle/salle.module';
import { LaFactoryCursusModule } from './cursus/cursus.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LaFactoryFormateurModule,
        LaFactoryStagiaireModule,
        LaFactoryAdresseModule,
        LaFactoryTechnicienModule,
        LaFactoryGestionnaireModule,
        LaFactoryModuleModule,
        LaFactoryMatiereModule,
        LaFactoryOrdinateurModule,
        LaFactoryProjecteurModule,
        LaFactorySalleModule,
        LaFactoryCursusModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LaFactoryEntityModule {}
