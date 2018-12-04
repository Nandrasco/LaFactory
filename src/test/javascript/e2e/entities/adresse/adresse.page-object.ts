import { element, by, ElementFinder } from 'protractor';

export class AdresseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-adresse div table .btn-danger'));
    title = element.all(by.css('jhi-adresse div h2#page-heading span')).first();

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

export class AdresseUpdatePage {
    pageTitle = element(by.id('jhi-adresse-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    stagiaireSelect = element(by.id('field_stagiaire'));
    formateurSelect = element(by.id('field_formateur'));
    technicienSelect = element(by.id('field_technicien'));
    gestionnaireSelect = element(by.id('field_gestionnaire'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async stagiaireSelectLastOption() {
        await this.stagiaireSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async stagiaireSelectOption(option) {
        await this.stagiaireSelect.sendKeys(option);
    }

    getStagiaireSelect(): ElementFinder {
        return this.stagiaireSelect;
    }

    async getStagiaireSelectedOption() {
        return this.stagiaireSelect.element(by.css('option:checked')).getText();
    }

    async formateurSelectLastOption() {
        await this.formateurSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async formateurSelectOption(option) {
        await this.formateurSelect.sendKeys(option);
    }

    getFormateurSelect(): ElementFinder {
        return this.formateurSelect;
    }

    async getFormateurSelectedOption() {
        return this.formateurSelect.element(by.css('option:checked')).getText();
    }

    async technicienSelectLastOption() {
        await this.technicienSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async technicienSelectOption(option) {
        await this.technicienSelect.sendKeys(option);
    }

    getTechnicienSelect(): ElementFinder {
        return this.technicienSelect;
    }

    async getTechnicienSelectedOption() {
        return this.technicienSelect.element(by.css('option:checked')).getText();
    }

    async gestionnaireSelectLastOption() {
        await this.gestionnaireSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async gestionnaireSelectOption(option) {
        await this.gestionnaireSelect.sendKeys(option);
    }

    getGestionnaireSelect(): ElementFinder {
        return this.gestionnaireSelect;
    }

    async getGestionnaireSelectedOption() {
        return this.gestionnaireSelect.element(by.css('option:checked')).getText();
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

export class AdresseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-adresse-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-adresse'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
