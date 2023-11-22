describe('Edit Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:80/login');
        cy.fillOutLoginForm('test@css.ch', 'testcss');
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

    it('should write text in textarea and apply bold formatting', () => {
        const inputText = 'This is a test.';
        const titleText = 'Test Title';
        cy.get('#titel').type(titleText);
        cy.get('#text').type(inputText);
        cy.get('#text').invoke('prop', 'selectionStart', 0).invoke('prop', 'selectionEnd', inputText.length);
        cy.get('.editor-menubar button[matTooltip="Fett"]').should('exist').click();
        cy.get('#text').should('have.value', `<b>This is a test.</b>`);
    });

    it('should write text in textarea and apply italic formatting', () => {
        const inputText = 'This is a test.';
        const titleText = 'Test Title';
        cy.get('#titel').type(titleText);
        cy.get('#text').type(inputText);
        cy.get('#text').invoke('prop', 'selectionStart', 0).invoke('prop', 'selectionEnd', inputText.length);
        cy.get('.editor-menubar button[matTooltip="Kursiv"]').should('exist').click();
        cy.get('#text').should('have.value', `<i>This is a test.</i>`);
    });

    it('should write text in textarea and apply title formatting', () => {
        const inputText = 'This is a test.';
        const titleText = 'Test Title';
        cy.get('#titel').type(titleText);
        cy.get('#text').type(inputText);
        cy.get('#text').invoke('prop', 'selectionStart', 0).invoke('prop', 'selectionEnd', inputText.length);
        cy.get('.editor-menubar button[matTooltip="Titel"]').should('exist').click();
        cy.get('#text').should('have.value', `<h1>This is a test.</h1>`);
    });
});
