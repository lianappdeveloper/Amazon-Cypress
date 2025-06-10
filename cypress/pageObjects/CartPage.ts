export class CartPage {
  visitCart() {
    cy.visit('https://www.amazon.com/gp/cart/view.html');
  }

  removeAllItems() {
  cy.get('body').then(($body) => {
    if ($body.find('[value="Delete"]').length > 0) {
      cy.get('[value="Delete"]').first().click();
      cy.reload();
      this.removeAllItems();
    } 
  });
}



  assertCartIsEmpty() {
    cy.contains('Your Amazon Cart is empty').should('be.visible');
  }

  assertProductExists(productText: string) {
    cy.contains(productText).should('exist');
  }

 changeQuantity(productKeyword: string, desiredQuantity: number) {
  cy.contains(productKeyword).parents('.sc-list-item').within(() => {
    cy.get('[data-a-selector="value"]') 
      .invoke('text')
      .then((text) => {
        const currentQty = parseInt(text.trim());
        const clicksNeeded = desiredQuantity - currentQty;

        if (clicksNeeded > 0) {
          for (let i = 0; i < clicksNeeded; i++) {
            cy.get('button[data-action="a-stepper-increment"]').click();
          }
        } else if (clicksNeeded < 0) {
          for (let i = 0; i < Math.abs(clicksNeeded); i++) {
            cy.get('button[data-action="a-stepper-decrement"]').click();
          }
        } else {
          cy.log('Quantity is already correct');
        }
      });
  });
}

  assertFreeShippingText() {
    cy.contains('qualifies for FREE Shipping').should('exist');
  }
}
