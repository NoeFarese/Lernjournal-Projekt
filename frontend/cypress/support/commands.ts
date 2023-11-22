import Chainable = Cypress.Chainable;

declare namespace Cypress {
    interface Chainable {
        getMatSnackbar(): Chainable<string>;
        login(email: string, password: string): Chainable;
        registrate(email: string, password: string, confirmPassword: string): Chainable;
        deleteUser(email: string, password: string, confirmPassword: string):Chainable;
        changePassword(actualPassword: string, newPassword: string, confirmNewPassword: string): Chainable;
        clearForm(): Chainable;
    }
}

function getMatSnackbar(): Chainable<string> {
    return cy.get('.mat-simple-snackbar').invoke('text');
}

Cypress.Commands.add('getMatSnackbar', getMatSnackbar);

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('input[formControlName="email"]').type(email);
    cy.get('input[formControlName="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('registrate', (email: string, password: string, confirmPassword: string) => {
    cy.get('[formControlName="email"]').type(email);
    cy.get('[formControlName="password"]').type(password);
    cy.get('[formControlName="confirmPassword"]').type(confirmPassword, { force: true });
    cy.get('form').submit();
});

Cypress.Commands.add('deleteUser', (email: string, password: string, confirmPassword: string) => {
    cy.get('[formControlName="email"]').type(email);
    cy.get('[formControlName="password"]').type(password);
    cy.get('[formControlName="confirmPassword"]').type(confirmPassword, { force: true });
    cy.get('.delete-account-button').click();
});

Cypress.Commands.add('clearForm', () => {
    cy.get('[formControlName="email"]').clear();
    cy.get('[formControlName="password"]').clear();
    cy.get('[formControlName="confirmPassword"]').clear();
});

Cypress.Commands.add('changePassword', (actualPassword: string, newPassword: string, confirmNewPassword: string) => {
    cy.get('[formControlName="actualPassword"]').type(actualPassword, { force: true });
    cy.get('[formControlName="newPassword"]').type(newPassword, { force: true });
    cy.get('[formControlName="confirmNewPassword"]').type(confirmNewPassword, { force: true });
    cy.get('form').submit();
});