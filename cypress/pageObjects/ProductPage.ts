export class ProductPage {
  private selectedColorLabel = () => cy.get('#inline-twister-expanded-dimension-text-color_name');
  private productSearchfield = () => cy.get('#twotabsearchtextbox');

  searchProduct(query: string) {
    this.productSearchfield().type(`${query}{enter}`);
  }

selectSearchResult(title: string) {
cy.get('[data-cy="title-recipe"]').contains(title).closest('a').click();
}




  addToCart() {
    cy.contains('Add to Cart').click();
  }

  assertAddedToCart() {
    cy.contains('Added to cart').should('be.visible');
  }

assertProductImageInSideCart(altTextStart: string) {
  cy.get('#ewc-content')
    .find(`img.sc-product-image[alt^="${altTextStart}"]`)
    .should('be.visible');
}


  visitProductPage(url: string) {
    cy.visit(url);
  }

selectColorOption(colorName: string) {
  cy.get(`img[alt="${colorName}"]:visible`)
    .should('be.visible')
    .first()
    .closest('span.a-button-toggle')
    .should('be.visible')
    .click();

  this.selectedColorLabel().should('be.visible').and('contain.text', colorName);
}

assertColorIsSelected(selectedColor: string) {
  this.selectedColorLabel().invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq(selectedColor);
    });
}

}
