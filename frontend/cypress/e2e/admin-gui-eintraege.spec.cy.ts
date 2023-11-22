describe('Admin-GUI-Home Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/login');
        cy.fillOutLoginForm('test@css.ch', 'testcss');
        cy.url().should('eq', 'http://localhost/home');

        cy.visit('http://localhost/admin/eintraege/b@b.ch');
        cy.url().should('eq', 'http://localhost/admin/eintraege/b@b.ch');
    });

    it('should display user email in the heading', () => {
        cy.get('h1 b').should('have.text', 'b@b.ch');
    });

    it('should filter entries by search term', () => {
        const searchTerm = '2';
        cy.get('mat-form-field input').type(searchTerm, { force: true });
        cy.get('.eintrag-item a').should('contain', searchTerm);
    });

    it('should click first entry', () => {
        cy.get('.eintrag-item').first().find('a').click();
        cy.url().should('include', '/eintrag/');
    });
});