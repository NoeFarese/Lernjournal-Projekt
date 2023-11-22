describe('Delete-Account Page Test', () => {
   beforeEach(() => {
       cy.visit('http://localhost:80/registration');
       cy.fillOutRegistrationForm('user@example.com', 'password123', 'password123');
       cy.contains('Du wurdest erfolgreich registriert').should('exist');

       cy.visit('http://localhost:80/login');
       cy.fillOutLoginForm('user@example.com', 'password123')
       cy.url().should('eq', 'http://localhost/home');

       cy.visit('http://localhost:80/deleteAccount');
   });

   afterEach(() => {
       cy.fillOutDeleteUserForm('user@example.com', 'password123', 'password123');
       cy.contains('Ihr Account wird jetzt gelöscht').should('exist');
       cy.wait(5000);
   });

    it('should display snackbar for empty fields', () => {
        cy.get('.delete-account-button').click();
        cy.contains('Bitte füllen Sie alle Felder aus').should('be.visible');
    });

    it('should display snackbar for passwords not matching', () => {
        cy.fillOutDeleteUserForm('user@example.com', 'password123', 'password456');
        cy.contains('Passwörter stimmen nicht überein').should('exist');
        cy.clearForm();
    });

    it('should display snackbar for incorrect email', () => {
        cy.fillOutDeleteUserForm('incorrect@example.com', 'password123', 'password123');
        cy.contains('Die eingegebene E-Mail stimmt nicht mit der aktuellen E-Mail überein').should('exist');
        cy.clearForm();
    });

    it('should display snackbar for incorrect email or password', () => {
        cy.fillOutDeleteUserForm('user@example.com', 'incorrectpassword', 'incorrectpassword');
        cy.contains('E-Mail oder Passwort ist falsch').should('exist');
        cy.clearForm();
    });
});