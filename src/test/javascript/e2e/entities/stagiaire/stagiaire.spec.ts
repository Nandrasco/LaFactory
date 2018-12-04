/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StagiaireComponentsPage, StagiaireDeleteDialog, StagiaireUpdatePage } from './stagiaire.page-object';

const expect = chai.expect;

describe('Stagiaire e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let stagiaireUpdatePage: StagiaireUpdatePage;
    let stagiaireComponentsPage: StagiaireComponentsPage;
    let stagiaireDeleteDialog: StagiaireDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Stagiaires', async () => {
        await navBarPage.goToEntity('stagiaire');
        stagiaireComponentsPage = new StagiaireComponentsPage();
        expect(await stagiaireComponentsPage.getTitle()).to.eq('laFactoryApp.stagiaire.home.title');
    });

    it('should load create Stagiaire page', async () => {
        await stagiaireComponentsPage.clickOnCreateButton();
        stagiaireUpdatePage = new StagiaireUpdatePage();
        expect(await stagiaireUpdatePage.getPageTitle()).to.eq('laFactoryApp.stagiaire.home.createOrEditLabel');
        await stagiaireUpdatePage.cancel();
    });

    it('should create and save Stagiaires', async () => {
        const nbButtonsBeforeCreate = await stagiaireComponentsPage.countDeleteButtons();

        await stagiaireComponentsPage.clickOnCreateButton();
        await promise.all([
            stagiaireUpdatePage.setNomInput('nom'),
            stagiaireUpdatePage.setPrenomInput('prenom'),
            stagiaireUpdatePage.setCoordonneesInput('coordonnees')
        ]);
        expect(await stagiaireUpdatePage.getNomInput()).to.eq('nom');
        expect(await stagiaireUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await stagiaireUpdatePage.getCoordonneesInput()).to.eq('coordonnees');
        await stagiaireUpdatePage.save();
        expect(await stagiaireUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await stagiaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Stagiaire', async () => {
        const nbButtonsBeforeDelete = await stagiaireComponentsPage.countDeleteButtons();
        await stagiaireComponentsPage.clickOnLastDeleteButton();

        stagiaireDeleteDialog = new StagiaireDeleteDialog();
        expect(await stagiaireDeleteDialog.getDialogTitle()).to.eq('laFactoryApp.stagiaire.delete.question');
        await stagiaireDeleteDialog.clickOnConfirmButton();

        expect(await stagiaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
