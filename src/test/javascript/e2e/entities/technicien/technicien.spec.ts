/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TechnicienComponentsPage, TechnicienDeleteDialog, TechnicienUpdatePage } from './technicien.page-object';

const expect = chai.expect;

describe('Technicien e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let technicienUpdatePage: TechnicienUpdatePage;
    let technicienComponentsPage: TechnicienComponentsPage;
    let technicienDeleteDialog: TechnicienDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Techniciens', async () => {
        await navBarPage.goToEntity('technicien');
        technicienComponentsPage = new TechnicienComponentsPage();
        expect(await technicienComponentsPage.getTitle()).to.eq('laFactoryApp.technicien.home.title');
    });

    it('should load create Technicien page', async () => {
        await technicienComponentsPage.clickOnCreateButton();
        technicienUpdatePage = new TechnicienUpdatePage();
        expect(await technicienUpdatePage.getPageTitle()).to.eq('laFactoryApp.technicien.home.createOrEditLabel');
        await technicienUpdatePage.cancel();
    });

    it('should create and save Techniciens', async () => {
        const nbButtonsBeforeCreate = await technicienComponentsPage.countDeleteButtons();

        await technicienComponentsPage.clickOnCreateButton();
        await promise.all([
            technicienUpdatePage.setNomInput('nom'),
            technicienUpdatePage.setPrenomInput('prenom'),
            technicienUpdatePage.setCoordonneesInput('coordonnees')
        ]);
        expect(await technicienUpdatePage.getNomInput()).to.eq('nom');
        expect(await technicienUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await technicienUpdatePage.getCoordonneesInput()).to.eq('coordonnees');
        await technicienUpdatePage.save();
        expect(await technicienUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await technicienComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Technicien', async () => {
        const nbButtonsBeforeDelete = await technicienComponentsPage.countDeleteButtons();
        await technicienComponentsPage.clickOnLastDeleteButton();

        technicienDeleteDialog = new TechnicienDeleteDialog();
        expect(await technicienDeleteDialog.getDialogTitle()).to.eq('laFactoryApp.technicien.delete.question');
        await technicienDeleteDialog.clickOnConfirmButton();

        expect(await technicienComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
