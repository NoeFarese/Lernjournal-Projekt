describe('Admin-GUI-Home Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/login');
        cy.get('input[formControlName="email"]').type('test@css.ch');
        cy.get('input[formControlName="password"]').type('testcss');
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', 'http://localhost/home');

        cy.visit('http://localhost:80/admin/home');
        cy.url().should('eq', 'http://localhost/admin/home');

    });

    it('should display header for Praxisbildner', () => {
        cy.get('h1').contains('Für Praxisbildner');
    });

    it('should display search bar with label', () => {
        cy.get('.searchbar mat-label').should('have.text', 'Suche nach Personen');
    });

    it('should type in search term', () => {
        const searchTerm = 'b';
        cy.get('.searchbar input').type(searchTerm).should('have.value', searchTerm);

        cy.wait(1000);

        cy.get('.personen mat-list-item').should('have.length.greaterThan', 0);
        cy.get('.personen mat-list-item').each(($item) => {
            cy.wrap($item).should('contain', searchTerm);
        });
    });

    it('should display list of persons with matTooltip', () => {
        cy.get('.personen mat-list-item').should('have.length.greaterThan', 0);
        cy.get('.personen a').should('have.attr', 'matTooltip');
    });


    it('should navigate to person entries on clicking email link', () => {
        cy.get('.personen a').first().click();
        cy.url().should('include', '/admin/eintraege');
    });
});