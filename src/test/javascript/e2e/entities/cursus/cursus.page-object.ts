import { element, by, ElementFinder } from 'protractor';

export class CursusComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cursus div table .btn-danger'));
    title = element.all(by.css('jhi-cursus div h2#page-heading span')).first();

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

export class CursusUpdatePage {
    pageTitle = element(by.id('jhi-cursus-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    dateDebutInput = element(by.id('field_dateDebut'));
    dateFinInput = element(by.id('field_dateFin'));
    salleSelect = element(by.id('field_salle'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setDateDebutInput(dateDebut) {
        await this.dateDebutInput.sendKeys(dateDebut);
    }

    async getDateDebutInput() {
        return this.dateDebutInput.getAttribute('value');
    }

    async setDateFinInput(dateFin) {
        await this.dateFinInput.sendKeys(dateFin);
    }

    async getDateFinInput() {
        return this.dateFinInput.getAttribute('value');
    }

    async salleSelectLastOption() {
        await this.salleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async salleSelectOption(option) {
        await this.salleSelect.sendKeys(option);
    }

    getSalleSelect(): ElementFinder {
        return this.salleSelect;
    }

    async getSalleSelectedOption() {
        return this.salleSelect.element(by.css('option:checked')).getText();
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

export class CursusDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cursus-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cursus'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
