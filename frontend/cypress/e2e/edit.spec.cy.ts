describe('Edit Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/login');
        cy.get('input[formControlName="email"]').type('test@css.ch');
        cy.get('input[formControlName="password"]').type('testcss');
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', 'http://localhost/home');

        cy.visit('http://localhost:80/edit');
        cy.url().should('eq', 'http://localhost/edit');
    });

    it('should display the edit page elements', () => {
        cy.get('.titel-form-field').should('exist');
        cy.get('.editor-menubar').should('exist');
        cy.get('.text-form-field').should('exist');
        cy.get('.save-button').should('exist');
        cy.get('.exportPdf-button').should('exist');
    });

/*
    it('should insert text with format when button clicked', () => {
        const text = 'This is a test.';
        cy.get('#text')
            .type(text)
            .select(5, 10)
            .then(() => {
                cy.get('.editor-menubar button[matTooltip="Fett"]').click();
            });

        cy.get('#text').should('have.value', 'This <b>is a</b> test.');
    });
 */


    it('should save the entry when save button clicked', () => {
        const titel = 'Test Titel';
        const text = 'This is a test entry.';
        cy.get('#titel').type(titel);
        cy.get('#text').type(text);
        cy.get('.save-button').click();
        cy.contains('Der Eintrag wurde erflogreich gespeichert').should('exist');
        cy.url().should('eq', 'http://localhost/home');
    });

    it('should show error message that an entry with the same title already exists', () => {
        const titel = 'Test Titel';
        const text = 'This is a test entry.';
        cy.get('#titel').type(titel);
        cy.get('#text').type(text);
        cy.get('.save-button').click();
        cy.contains('Ein Eintrag mit diesem Titel existiert bereits').should('exist');
    });
});
