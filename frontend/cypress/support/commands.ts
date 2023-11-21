import Chainable = Cypress.Chainable;

declare namespace Cypress {
    interface Chainable {
        getMatSnackbar(): Chainable<string>;
        login(email: string, password: string): Chainable;
    }
}

function getMatSnackbar(): Chainable<string> {
    return cy.get('.mat-simple-snackbar').invoke('text');
}

Cypress.Commands.add('getMatSnackbar', getMatSnackbar);
Cypress.Commands.add('login', (email: any, password: any) => {
    cy.get('input[formControlName="email"]').type(email);
    cy.get('input[formControlName="password"]').type(password);
    cy.get('button[type="submit"]').click();
});
