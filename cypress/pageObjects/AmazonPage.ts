export class AmazonPage {
  // URLs
  public amazonURL = 'https://www.amazon.com';
  private customerServiceURL = 'nav_cs_customerservice';

  // Element Getters
  getCustomerServiceButton = () => cy.get('a[data-csa-c-content-id="nav_cs_help"]');
  dismissButton = () => cy.get('input[data-action-type="DISMISS"]');
  getCustomerServiceSearchInput = () => cy.get('#hubHelpSearchInput');
  getLinkByText = (linkText: string) => cy.get('a').contains(linkText);

  // Methods
  visitAmazon() {
    cy.visit(this.amazonURL);
    this.dismissButton().should('be.visible').click();
    
  }

  goToCustomerService() {
    cy.contains('Customer Service').click({force:true});
    //this.getCustomerServiceButton().should('be.visible').click();
    cy.url().should('contain', this.customerServiceURL);
  }

  searchInCustomerService(query: string) {
    this.getCustomerServiceSearchInput().should('be.visible').type(`${query}{enter}`);
  }

  clickLinkByText(linkText: string) {
    this.getLinkByText(linkText).should('be.visible').click();
  }
}
