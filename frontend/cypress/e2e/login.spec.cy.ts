describe('Login Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:80');
    });

    it('Visits the home page', () => {
        cy.visit('http://localhost:80/login');
        cy.contains('Login');
    });

    it('Login with valid data', () => {
        cy.get('input[formControlName="email"]').type('test@css.ch');
        cy.get('input[formControlName="password"]').type('testcss');
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', 'http://localhost/home');
    });

    it('Logout', () => {
        cy.get('input[formControlName="email"]').type('test@css.ch');
        cy.get('input[formControlName="password"]').type('testcss');
        cy.get('button[type="submit"]').click();

        cy.visit('http://localhost/login');
        cy.get('.ausloggen-button').click();

        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.').should('be.visible');
    });

    it('Login with invalid data', () => {
        cy.get('input[formControlName="email"]').type('invalid@data.ch');
        cy.get('input[formControlName="password"]').type('1234567890');
        cy.get('button[type="submit"]').click();

        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.').should('be.visible');
    });

    it('Login form invalid', () => {
        cy.get('input[formControlName="email"]').type('a@a.ch')
        cy.get('input[formControlName="password"]').type(' ');
        cy.get('button[type="submit"]').click();

        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.').should('be.visible');
    });
});
