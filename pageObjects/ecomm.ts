import { Page } from '@playwright/test';
import { MenuPage } from './menuPage';
import { LoginPage } from './loginPage';
import { LandingPage } from './landingPage';
import { RegisterPage } from './registerPage';

export class Ecomm {
  private readonly page: Page;
  private readonly LandingPage: LandingPage;
  private readonly MenuPage: MenuPage;
  private readonly LoginPage: LoginPage;
  private readonly RegisterPage: RegisterPage;

  constructor(page: Page) {
    this.page = page;
    this.LandingPage = new LandingPage(this.page);
    this.MenuPage = new MenuPage(this.page);
    this.LoginPage = new LoginPage(this.page);
    this.RegisterPage = new RegisterPage(this.page);
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
}
