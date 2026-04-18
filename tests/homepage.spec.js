import { test, expect } from '@playwright/test';
  import { HomePage } from './pages/HomePage.js';

  test.describe('Home Page', () => {

    test('should load the home page successfully', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      // Check the page title
      await expect(page).toHaveTitle('Home');
    });

    test('should display the logo', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.logo).toBeVisible();
    });

    test('should display the emergency call section', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.emergencyCall).toBeVisible();
      await expect(homePage.emergencyCall).toContainText('1313');
    });

    test('should display all navigation links', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.navHome).toBeVisible();
      await expect(homePage.navAboutUs).toBeVisible();
      await expect(homePage.navServices).toBeVisible();
      await expect(homePage.navDoctors).toBeVisible();
      await expect(homePage.navConsulting).toBeVisible();
      await expect(homePage.navPharmacy).toBeVisible();
    });

    test('should display hero heading', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.heroHeading).toBeVisible();
      await expect(homePage.heroHeading).toContainText('Bringing healthcare closer to you');
    });

    test('should display welcome message', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.welcomeHeading).toBeVisible();
      await expect(homePage.welcomeHeading).toHaveText('Welcome to Wellspring Hospital');
    });

    test('should display Patient Resources section', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.patientResourcesHeading).toBeVisible();
    });

    test('should display Why Choose Us section', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.whyChooseUsHeading).toBeVisible();
    });

    test('should display footer with contact info', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.footerLogo).toBeVisible();
      await expect(homePage.footerContactUs).toBeVisible();
      await expect(homePage.footerBranches).toBeVisible();
    });

    test('should display copyright text', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();

      await expect(homePage.copyrightText).toContainText('2024 Wellspring Hospital');
    });
  });