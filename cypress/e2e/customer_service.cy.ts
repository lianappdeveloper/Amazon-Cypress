import { AmazonPage } from '../pageObjects/AmazonPage';

describe('D&B - Home assignment', () => {

  const amazonPage = new AmazonPage();

  it('Navigates to Customer Service and opens the "Wheres My Stuff?" help article', () => {
    amazonPage.visitAmazon();
    amazonPage.goToCustomerService();
    amazonPage.searchInCustomerService("Where is my stuff");
    amazonPage.clickLinkByText("Where's My Stuff?");
  })
})
