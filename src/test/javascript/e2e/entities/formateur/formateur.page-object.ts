import { element, by, ElementFinder } from 'protractor';

export class FormateurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-formateur div table .btn-danger'));
    title = element.all(by.css('jhi-formateur div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FormateurUpdatePage {
    pageTitle = element(by.id('jhi-formateur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    prenomInput = element(by.id('field_prenom'));
    coordonneesInput = element(by.id('field_coordonnees'));
    niveauSelect = element(by.id('field_niveau'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setPrenomInput(prenom) {
        await this.prenomInput.sendKeys(prenom);
    }

    async getPrenomInput() {
        return this.prenomInput.getAttribute('value');
    }

    async setCoordonneesInput(coordonnees) {
        await this.coordonneesInput.sendKeys(coordonnees);
    }

    async getCoordonneesInput() {
        return this.coordonneesInput.getAttribute('value');
    }

    async setNiveauSelect(niveau) {
        await this.niveauSelect.sendKeys(niveau);
    }

    async getNiveauSelect() {
        return this.niveauSelect.element(by.css('option:checked')).getText();
    }

    async niveauSelectLastOption() {
        await this.niveauSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class FormateurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-formateur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-formateur'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
