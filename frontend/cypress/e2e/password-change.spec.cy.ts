describe('Password-Change Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/login');
        cy.login('a@a.ch', 'aaaaaaaa');
        cy.url().should('eq', 'http://localhost/home');

        cy.visit('http://localhost/changePassword');
    }) ;

    afterEach(() => {
        cy.visit('http://localhost/changePassword');
        cy.changePassword('passwordChanged', 'aaaaaaaa', 'aaaaaaaa');
    })

    it('should have all HTML elements', () => {
        cy.get('.changePassword-container').within(() => {
            cy.get('h2').should('exist');

            cy.get('form').within(() => {
                cy.get('[formControlName="actualPassword"]').should('exist');
                cy.get('[formControlName="newPassword"]').should('exist');
                cy.get('[formControlName="confirmNewPassword"]').should('exist');
                cy.get('button[type="submit"]').should('exist');
            });
        });
    });

    it('should change the password successfully', () => {
        cy.changePassword('aaaaaaaa', 'passwordChanged', 'passwordChanged');
        cy.contains('Passwort erfolgreich geändert').should('exist');
    });

    it('should show error message for incorrect actual password', () => {
        cy.changePassword('notTheActualPassword', 'passwordChanged', 'passwordChanged');
        cy.contains('Das aktuelle Passwort ist nicht korrekt').should('exist');
    });


    it('should show error message for invalid input', () => {
        cy.get('[formControlName="actualPassword"]').type('onlyOneFieldFilledOut', { force: true });
        cy.get('form').submit();

        cy.contains('Bitte füllen Sie alle Felder aus').should('exist');
    });

    it('should show error message for new password does not match the confirmation', () => {
        cy.changePassword('aaaaaaaa', 'passwordChanged', 'passwordChangedNotMatching');
        cy.contains('Das neue Passwort stimmt nicht mit der Bestätigung überein').should('exist');

        cy.changePassword('aaaaaaaa', 'passwordChangedNotMatching', 'passwordChanged');
        cy.contains('Das neue Passwort stimmt nicht mit der Bestätigung überein').should('exist');
    });

    it('should show error message for "new password should not be the same as the actual password"', () => {
        cy.changePassword('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa');
        cy.contains('Das neue Passwort sollte sich vom aktuellen Passwort unterscheiden').should('exist');
    });
});