import { Page } from '@playwright/test';
import { MenuPage } from './menuPage';
import { LoginPage } from './loginPage';
import { LandingPage } from './landingPage';
import { RegisterPage } from './registerPage';
import { AccountPage } from './accountPage';
import { SearchPage } from './searchPage';
import { ProductDetailsPage } from './productDetailsPage';

export class Ecomm {
  private readonly page: Page;
  private readonly LandingPage: LandingPage;
  private readonly MenuPage: MenuPage;
  private readonly LoginPage: LoginPage;
  private readonly RegisterPage: RegisterPage;
  private readonly AccountPage: AccountPage;
  private readonly SearchPage: SearchPage;
  private readonly ProductDetailsPage: ProductDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.LandingPage = new LandingPage(this.page);
    this.MenuPage = new MenuPage(this.page);
    this.LoginPage = new LoginPage(this.page);
    this.RegisterPage = new RegisterPage(this.page);
    this.AccountPage = new AccountPage(this.page);
    this.SearchPage = new SearchPage(this.page);
    this.ProductDetailsPage = new ProductDetailsPage(this.page);
  }
  landing() {
    return this.LandingPage;
  }
  menu() {
    return this.MenuPage;
  }
  login() {
    return this.LoginPage;
  }
  register() {
    return this.RegisterPage;
  }
  account() {
    return this.AccountPage;
  }
  search() {
    return this.SearchPage;
  }
  productDetails() {
    return this.ProductDetailsPage;
  }
}
