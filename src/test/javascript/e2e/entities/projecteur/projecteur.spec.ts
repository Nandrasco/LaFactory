/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProjecteurComponentsPage, ProjecteurDeleteDialog, ProjecteurUpdatePage } from './projecteur.page-object';

const expect = chai.expect;

describe('Projecteur e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let projecteurUpdatePage: ProjecteurUpdatePage;
    let projecteurComponentsPage: ProjecteurComponentsPage;
    let projecteurDeleteDialog: ProjecteurDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Projecteurs', async () => {
        await navBarPage.goToEntity('projecteur');
        projecteurComponentsPage = new ProjecteurComponentsPage();
        expect(await projecteurComponentsPage.getTitle()).to.eq('laFactoryApp.projecteur.home.title');
    });

    it('should load create Projecteur page', async () => {
        await projecteurComponentsPage.clickOnCreateButton();
        projecteurUpdatePage = new ProjecteurUpdatePage();
        expect(await projecteurUpdatePage.getPageTitle()).to.eq('laFactoryApp.projecteur.home.createOrEditLabel');
        await projecteurUpdatePage.cancel();
    });

    it('should create and save Projecteurs', async () => {
        const nbButtonsBeforeCreate = await projecteurComponentsPage.countDeleteButtons();

        await projecteurComponentsPage.clickOnCreateButton();
        await promise.all([
            projecteurUpdatePage.setCodeInput('code'),
            projecteurUpdatePage.setCoutInput('5'),
            projecteurUpdatePage.setDateDebutInput('2000-12-31'),
            projecteurUpdatePage.setDateFinInput('2000-12-31'),
            projecteurUpdatePage.salleSelectLastOption()
        ]);
        expect(await projecteurUpdatePage.getCodeInput()).to.eq('code');
        expect(await projecteurUpdatePage.getCoutInput()).to.eq('5');
        const selectedDispo = projecteurUpdatePage.getDispoInput();
        if (await selectedDispo.isSelected()) {
            await projecteurUpdatePage.getDispoInput().click();
            expect(await projecteurUpdatePage.getDispoInput().isSelected()).to.be.false;
        } else {
            await projecteurUpdatePage.getDispoInput().click();
            expect(await projecteurUpdatePage.getDispoInput().isSelected()).to.be.true;
        }
        expect(await projecteurUpdatePage.getDateDebutInput()).to.eq('2000-12-31');
        expect(await projecteurUpdatePage.getDateFinInput()).to.eq('2000-12-31');
        await projecteurUpdatePage.save();
        expect(await projecteurUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await projecteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Projecteur', async () => {
        const nbButtonsBeforeDelete = await projecteurComponentsPage.countDeleteButtons();
        await projecteurComponentsPage.clickOnLastDeleteButton();

        projecteurDeleteDialog = new ProjecteurDeleteDialog();
        expect(await projecteurDeleteDialog.getDialogTitle()).to.eq('laFactoryApp.projecteur.delete.question');
        await projecteurDeleteDialog.clickOnConfirmButton();

        expect(await projecteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
