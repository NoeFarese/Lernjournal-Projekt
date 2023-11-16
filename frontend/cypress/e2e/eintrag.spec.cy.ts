describe('Eintrag Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost/eintrag/42');
    });

    it('should check if HTML elements are existing', () => {
        cy.get('.eintrag-titel').should('exist');
        cy.get('.eintrag-text').should('exist');
        cy.get('.redirect-to-home-button').should('exist');
    });

    it('should check the "zur Homeseite" button', () => {
        cy.get('.redirect-to-home-button').should('have.text', 'Zur Homeseite');
        cy.get('.redirect-to-home-button').click();

        cy.url().should('eq', 'http://localhost/home');
    });

    it('should have the correct styling for elements', () => {
        cy.get('.eintrag-titel').should('have.css', 'font-size', '24px');
        cy.get('.eintrag-text').should('have.css', 'color', 'rgb(51, 51, 51)');
        cy.get('.redirect-to-home-button').should('have.css', 'background-color', 'rgb(64, 59, 184)');
    });

    it('should be visible after data is loaded', () => {
        cy.get('.eintrag-titel').should('be.visible');
        cy.get('.eintrag-text').should('be.visible');
        cy.get('.redirect-to-home-button').should('be.visible');
    });
});

