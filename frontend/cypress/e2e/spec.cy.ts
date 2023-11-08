describe('Login Test', () => {

    it('Visits the home page', () => {
        cy.visit('http://localhost:80/login');
    });

    it('should log in with valid data', () => {
        cy.visit('http://localhost:80');
        cy.contains('Login');

        cy.get('input[formControlName="email"]').type('test@css.ch');
        cy.get('input[formControlName="password"]').type('testcss');
        cy.get('button[type="submit"]').click();

        cy.contains('Du bist eingeloggt.');
        cy.contains('Ausloggen').click();
        cy.contains('Du bist nicht eingeloggt. Bitte melde dich an.');
    });
});
