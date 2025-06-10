import { LoginPage } from '../pageObjects/LoginPage';
import { CartPage } from '../pageObjects/CartPage';
import { ProductPage } from '../pageObjects/ProductPage';
import { AmazonPage } from '../pageObjects/AmazonPage';

describe('D&B - Task 2: Amazon Cart Flow', () => {
  const loginPage = new LoginPage();
  const amazonPage = new AmazonPage();
  const cartPage = new CartPage();
  const productPage = new ProductPage();

  const email = Cypress.env('amazon_email');
  const password = Cypress.env('amazon_password');

  beforeEach(() => {
    loginPage.login(email, password);

    cy.visit(amazonPage.amazonURL);

    productPage.searchProduct('Bostitch Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Blue');
    productPage.selectSearchResult('Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Blue');
    productPage.addToCart();
    productPage.assertAddedToCart();
    productPage.assertProductImageInSideCart('Bostitch Office Personal Electric Pencil Sharpener');

    productPage.visitProductPage(
      'https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z'
    );
    productPage.selectColorOption('Yellow, Grey, Blue');
    productPage.assertColorIsSelected('Yellow, Grey, Blue');
    productPage.addToCart();
    productPage.assertAddedToCart();
  });

  afterEach(() => {
    cartPage.visitCart();
    cartPage.removeAllItems();
    cartPage.visitCart();
    cartPage.assertCartIsEmpty();
  });

  it('should show both products in the cart after setup', () => {
    cartPage.visitCart();
    cartPage.assertProductExists('Bostitch Office Personal Electric Pencil Sharpener');
    cartPage.assertProductExists('iBayam');
    cy.contains('eligible items to your order for FREE Shipping.')
  });

  it('should show free shipping eligibility after adding more sharpeners', () => {
    cartPage.visitCart();
    cartPage.changeQuantity('Bostitch', 4);
    cartPage.assertFreeShippingText();
  });
});
