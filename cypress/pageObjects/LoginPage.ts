export class LoginPage {

signInButton = () => cy.get('#nav-link-accountList');


visitLogin = () => cy.visit('https://www.amazon.com');

  fillEmail = (email: string) => {
    cy.get('#ap_email_login').type(email);
    cy.get('#continue').click();
  };

  fillPassword = (password: string) => {
    cy.get('#ap_password').type(password, { log: false });
    cy.get('#signInSubmit').click();
  };

  login = (email: string, password: string) => {
    this.visitLogin();
    this.signInButton().click();
    this.fillEmail(email);
    this.fillPassword(password);

    // Optional: assert successful login
    cy.url().should('include', 'amazon.com');
  };
}
