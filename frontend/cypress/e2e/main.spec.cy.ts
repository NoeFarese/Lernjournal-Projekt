describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/login');
        cy.get('input[formControlName="email"]').type('test@css.ch');
        cy.get('input[formControlName="password"]').type('testcss');
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', 'http://localhost/home');
    });

    it('should display Einträge heading', () => {
        cy.contains('h1', 'Einträge:');
    });

    it('should click the Eintrag', () => {
        cy.get('.div1 a').click();
        cy.url().should('include', '/eintrag/');
    });

    it('should click the edit Eintrag button', () => {
       cy.get('.div2 a').click();
       cy.url().should('include', '/edit/');
    });

    it('should search for "eintrag" and check if one exists', () => {
        cy.get('input[matInput]').type('eintrag', { force: true });
        cy.get('.eintrag-item').should('exist');
    });

    it('should download first Eintrag', () => {
        cy.get('.eintrag-item:first-child .exportPDF-Button').should('exist');
        cy.get('.eintrag-item:first-child .exportPDF-Button').click();
    });

    /*
    GEHT NOCH NICHT
    it('should download PDF for all Einträge', () => {
        cy.get('.exportAll-Checkbox').should('not.be.checked');
        cy.get('.exportAll-Checkbox').click();
        cy.get('.exportAll-Checkbox').should('be.checked');
    });
     */

    it('should delete Eintrag', () => {
        cy.get('.delete').first().click();
        cy.get('.eintrag-item').should('have.length', 0);
    });

});