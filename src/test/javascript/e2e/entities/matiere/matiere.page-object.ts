import { element, by, ElementFinder } from 'protractor';

export class MatiereComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-matiere div table .btn-danger'));
    title = element.all(by.css('jhi-matiere div h2#page-heading span')).first();

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

export class MatiereUpdatePage {
    pageTitle = element(by.id('jhi-matiere-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    niveauSelect = element(by.id('field_niveau'));
    formateursSelect = element(by.id('field_formateurs'));
    stagiairesSelect = element(by.id('field_stagiaires'));
    modulesSelect = element(by.id('field_modules'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
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

    async formateursSelectLastOption() {
        await this.formateursSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async formateursSelectOption(option) {
        await this.formateursSelect.sendKeys(option);
    }

    getFormateursSelect(): ElementFinder {
        return this.formateursSelect;
    }

    async getFormateursSelectedOption() {
        return this.formateursSelect.element(by.css('option:checked')).getText();
    }

    async stagiairesSelectLastOption() {
        await this.stagiairesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async stagiairesSelectOption(option) {
        await this.stagiairesSelect.sendKeys(option);
    }

    getStagiairesSelect(): ElementFinder {
        return this.stagiairesSelect;
    }

    async getStagiairesSelectedOption() {
        return this.stagiairesSelect.element(by.css('option:checked')).getText();
    }

    async modulesSelectLastOption() {
        await this.modulesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async modulesSelectOption(option) {
        await this.modulesSelect.sendKeys(option);
    }

    getModulesSelect(): ElementFinder {
        return this.modulesSelect;
    }

    async getModulesSelectedOption() {
        return this.modulesSelect.element(by.css('option:checked')).getText();
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

export class MatiereDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-matiere-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-matiere'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
