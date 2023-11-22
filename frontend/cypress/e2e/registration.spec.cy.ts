describe('Registration Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/registration');
    });

    it('visits the registration page', () => {
        cy.visit('http://localhost:80/registration');
        cy.contains('Registrierung');
    });

    it('should display registration form', () => {
        cy.get('.registration-container').should('exist');
        cy.get('.form-container').should('exist');
        cy.get('form').should('exist');
    });

    it('should show error messages for invalid form submission', () => {
        cy.get('form').submit();
        cy.contains('Bitte füllen Sie alle Felder aus').should('exist');
    });

    it('should show error message for password mismatch', () => {
        cy.registrate('test@example.com', 'password', 'differentPassword');
        cy.contains('Passwörter stimmen nicht überein').should('exist');
    });

    it('should show error message for password length less than 8 characters', () => {
        cy.registrate('test@example.com', 'baum', 'baum');
        cy.contains('Passwort muss mindestens 8 Zeichen haben').should('exist');
    });

    it('should show error message for user already exists', () => {
        cy.registrate('a@a.ch', 'aaaaaaaaaaa', 'aaaaaaaaaaa');
        cy.contains('User existiert schon').should('exist');
    });

    it('should make a valid registration and delete User afterwards ', () => {
        cy.registrate('test@example.com', 'validPassword123', 'validPassword123');
        cy.contains('Du wurdest erfolgreich registriert').should('exist');

        cy.visit('http://localhost/login');
        cy.login('test@example.com', 'validPassword123')

        cy.visit('http://localhost/deleteAccount');
        cy.deleteUser('test@example.com', 'validPassword123', 'validPassword123');
        cy.contains('Ihr Account wird jetzt gelöscht').should('exist');
        cy.url().should('eq', 'http://localhost/registration');
    });
});