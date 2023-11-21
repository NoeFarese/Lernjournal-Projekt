describe('Profil Test', () => {
   beforeEach(() => {
      cy.visit('http://localhost/registration');
      cy.get('[formControlName="email"]').type('test@example.com');
      cy.get('[formControlName="password"]').type('passwordExample');
      cy.get('[formControlName="confirmPassword"]').type('passwordExample', { force: true });
      cy.get('form').submit();
      cy.contains('Du wurdest erfolgreich registriert').should('exist');

      cy.visit('http://localhost:80/login');
      cy.get('input[formControlName="email"]').type('test@example.com');
      cy.get('input[formControlName="password"]').type('passwordExample');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost/home');

      cy.visit('http://localhost/profil');
   }) ;

   afterEach(() => {
      cy.visit('http://localhost/deleteAccount');
      cy.get('[formControlName="email"]').type('test@example.com');
      cy.get('[formControlName="password"]').type('passwordExample');
      cy.get('[formControlName="confirmPassword"]').type('passwordExample', { force: true });
      cy.get('.delete-account-button').click();

      cy.contains('Ihr Account wird jetzt gelöscht').should('exist');
      cy.wait(5000);
   })

   it('should navigate to "change password"', () => {
      cy.get('.passwort-aeandern-link').should('exist').click();
      cy.url().should('include', '/changePassword');
   });

   it('should navigate to "delete account"', () => {
      cy.get('.account-loeschen-link').should('exist').click();
      cy.url().should('include', '/deleteAccount');
   });

   it('should check if containers exist', () => {
      cy.get('.outer-container').should('exist');
      cy.get('.inner-container').should('exist');
      cy.get('.white-field').should('exist');
   });

   it('should check if user data is displayed', () => {
      cy.get('p').should('exist').should('contain.text', 'test@example.com').should('be.visible');
      cy.get('p').should('exist').should('contain.text', '0').should('be.visible');
   });
});