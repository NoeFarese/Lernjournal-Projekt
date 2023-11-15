describe('Delete-Account Page Test', () => {
   beforeEach(() => {
       cy.visit('http://localhost:80/registration');

       cy.get('[formControlName="email"]').type('user@example.com');
       cy.get('[formControlName="password"]').type('password123');
       cy.get('[formControlName="confirmPassword"]').type('password123', { force: true });
       cy.get('form').submit();
       cy.contains('Du wurdest erfolgreich registriert').should('exist');

       cy.visit('http://localhost:80/login');
       cy.get('input[formControlName="email"]').type('user@example.com');
       cy.get('input[formControlName="password"]').type('password123');
       cy.get('button[type="submit"]').click();
       cy.url().should('eq', 'http://localhost/home');

       cy.visit('http://localhost:80/deleteAccount');

   });

   afterEach(() => {
       cy.get('[formControlName="email"]').type('user@example.com');
       cy.get('[formControlName="password"]').type('password123');
       cy.get('[formControlName="confirmPassword"]').type('password123', { force: true });
       cy.get('.delete-account-button').click();

       cy.contains('Ihr Account wird jetzt gelöscht').should('exist');
       cy.wait(5000);
   });



    it('should display snackbar for empty fields', () => {
        cy.get('.delete-account-button').click();
        cy.contains('Bitte füllen Sie alle Felder aus').should('be.visible');
    });

    it('should display snackbar for passwords not matching', () => {
        cy.get('[formControlName="email"]').type('user@example.com');
        cy.get('[formControlName="password"]').type('password123');
        cy.get('[formControlName="confirmPassword"]').type('password456', { force: true });
        cy.get('.delete-account-button').click();

        cy.contains('Passwörter stimmen nicht überein').should('exist');

        cy.get('[formControlName="email"]').clear();
        cy.get('[formControlName="password"]').clear();
        cy.get('[formControlName="confirmPassword"]').clear();
    });

    it('should display snackbar for incorrect email', () => {
        cy.get('[formControlName="email"]').type('incorrect@example.com');
        cy.get('[formControlName="password"]').type('password123');
        cy.get('[formControlName="confirmPassword"]').type('password123', { force: true });
        cy.get('.delete-account-button').click();

        cy.contains('Die eingegebene E-Mail stimmt nicht mit der aktuellen E-Mail überein').should('exist');

        cy.get('[formControlName="email"]').clear();
        cy.get('[formControlName="password"]').clear();
        cy.get('[formControlName="confirmPassword"]').clear();
    });


    it('should display snackbar for incorrect email or password', () => {
        cy.get('[formControlName="email"]').type('user@example.com');
        cy.get('[formControlName="password"]').type('incorrectpassword');
        cy.get('[formControlName="confirmPassword"]').type('incorrectpassword', { force: true });
        cy.get('.delete-account-button').click();

        cy.contains('E-Mail oder Passwort ist falsch').should('exist');

        cy.get('[formControlName="email"]').clear();
        cy.get('[formControlName="password"]').clear();
        cy.get('[formControlName="confirmPassword"]').clear();
    });
});