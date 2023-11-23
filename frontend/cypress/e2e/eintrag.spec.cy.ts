describe('Eintrag Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost/login');
        cy.fillOutLoginForm('test@css.ch', 'testcss');

        cy.visit('http://localhost/eintrag/42');
    });

    it('should check if HTML elements are existing', () => {
        cy.get('.eintrag-titel').should('exist');
        cy.get('.eintrag-text').should('exist');
        cy.get('.go-back-button').should('exist');
    });

    it('should check the "go back" button', () => {
        cy.get('.go-back-button').should('have.text', 'go back');
        cy.get('.go-back-button').click();

        cy.url().should('eq', 'http://localhost/home');
    });

    it('should have the correct styling for elements', () => {
        cy.get('.eintrag-titel').should('have.css', 'font-size', '24px');
        cy.get('.eintrag-text').should('have.css', 'color', 'rgb(51, 51, 51)');
        cy.get('.go-back-button').should('have.css', 'background-color', 'rgb(64, 59, 184)');
    });

    it('should be visible after data is loaded', () => {
        cy.get('.eintrag-titel').should('be.visible');
        cy.get('.eintrag-text').should('be.visible');
        cy.get('.go-back-button').should('be.visible');
    });
});

