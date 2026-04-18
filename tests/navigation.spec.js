import { test, expect } from '@playwright/test';
  import { HomePage } from './pages/HomePage.js';

  test.describe('Navigation', () => {

    test('should navigate to About Us page', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.clickNavLink('About Us');

      await expect(page).toHaveTitle('About Us');
    });

    test('should navigate to Services page', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.clickNavLink('Services');

      await expect(page).toHaveTitle('Services');
    });

    test('should navigate to Our Doctors page', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.clickNavLink('Our Doctors');

      await expect(page).toHaveTitle('Our Doctors');
    });

    test('should navigate to Consulting Reservation page', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.clickNavLink('Consulting Reservation');

      await expect(page).toHaveTitle('Consulting Reservation');
    });

    test('should navigate to Pharmacy page', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.clickNavLink('Pharmacy');

      await expect(page).toHaveTitle('Pharmacy');
    });

    test('should navigate back to Home from About Us', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.clickNavLink('About Us');
      await expect(page).toHaveTitle('About Us');

      // Click Home to go back
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveTitle('Home');
    });

    test('should navigate to Patient Registration from Home page link', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.patientRegistrationLink.click();

      await expect(page).toHaveTitle('Patient Registration');
    });
  });