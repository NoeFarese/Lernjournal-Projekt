describe('Login Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:80');
    });

    it('visits the home page', () => {
        cy.contains('Login');
    });

    it('should display login form', () => {
        cy.get('.login-container').should('exist');
        cy.get('.form-container').should('exist');
        cy.get('.input-container').should('exist');
        cy.get('form').should('exist');
    });

    it('should login with valid data', () => {
        cy.fillOutLoginForm('test@css.ch', 'testcss');
        cy.url().should('eq', 'http://localhost/home');
    });

    it('Logout', () => {
        cy.fillOutLoginForm('test@css.ch', 'testcss');

        cy.visit('http://localhost/login');
        cy.get('.ausloggen-button').click();

        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.').should('be.visible');
    });

    it('Login with invalid data', () => {
        cy.fillOutLoginForm('invalid@data.ch', '1234567890');

        cy.contains('Email oder Passwort ist falsch').should('exist');
        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.').should('be.visible');
    });

    it('Login form invalid', () => {
        cy.get('input[formControlName="email"]').type('a@a.ch')
        cy.get('button[type="submit"]').click();

        cy.contains('Email oder Passwort nicht gültig').should('exist');
        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.').should('be.visible');
    });
});
