describe('Registration Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/registration');
    });

    it('visits the registration page', () => {
        cy.visit('http://localhost:80/registration');
        cy.contains('Login');
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
        cy.get('[formControlName="email"]').type('test@example.com');
        cy.get('[formControlName="password"]').type('password');
        cy.get('[formControlName="confirmPassword"]').type('differentPassword', { force: true });
        cy.get('form').submit();

        cy.contains('Passwörter stimmen nicht überein').should('exist');
    });

    it('should show error message for password length less than 8 characters', () => {
        cy.get('[formControlName="email"]').type('test@example.com');
        cy.get('[formControlName="password"]').type('pass');
        cy.get('[formControlName="confirmPassword"]').type('pass', { force: true });
        cy.get('form').submit();

        cy.contains('Passwort muss mindestens 8 Zeichen haben').should('exist');
    });

    it('should show error message for user already exists', () => {
        cy.get('[formControlName="email"]').type('a@a.ch');
        cy.get('[formControlName="password"]').type('aaaaaaaaaaa');
        cy.get('[formControlName="confirmPassword"]').type('aaaaaaaaaaa', { force: true });
        cy.get('form').submit();

        cy.contains('User existiert schon').should('exist');
    });

    it('should make a valid registration and delete User afterwards ', () => {
        //User erstellen/registrieren
        cy.get('[formControlName="email"]').type('test@example.com');
        cy.get('[formControlName="password"]').type('validPassword123');
        cy.get('[formControlName="confirmPassword"]').type('validPassword123', { force: true });
        cy.get('form').submit();

        cy.contains('Du wurdest erfolgreich registriert').should('exist');

        //User einloggen
        cy.visit('http://localhost/login');
        cy.get('input[formControlName="email"]').type('test@example.com');
        cy.get('input[formControlName="password"]').type('validPassword123');
        cy.get('button[type="submit"]').click();

        //User wieder löschen
        cy.visit('http://localhost/deleteAccount');
        cy.get('[formControlName="email"]').type('test@example.com');
        cy.get('[formControlName="password"]').type('validPassword123');
        cy.get('[formControlName="confirmPassword"]').type('validPassword123', { force: true })
        cy.get('form').submit();

        cy.contains('Ihr Account wird jetzt gelöscht').should('exist');
        cy.url().should('eq', 'http://localhost/registration');
    });
});