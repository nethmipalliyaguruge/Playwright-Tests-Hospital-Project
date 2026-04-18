import { test, expect } from '@playwright/test';
  import { AboutUsPage } from './pages/AboutUsPage.js';

  test.describe('About Us Page', () => {

    test('should load the page with correct heading', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.pageHeading).toBeVisible();
      await expect(page).toHaveTitle('About Us');
    });

    test('should display intro text', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.introText).toBeVisible();
    });

    test('should display all 3 branch sections', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.colomboHeading).toBeVisible();
      await expect(aboutPage.kandyHeading).toBeVisible();
      await expect(aboutPage.galleHeading).toBeVisible();
    });

    test('should display branch images', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.colomboImage).toBeVisible();
      await expect(aboutPage.kandyImage).toBeVisible();
      await expect(aboutPage.galleImage).toBeVisible();
    });

    test('should display 3 Google Maps iframes', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      const mapCount = await aboutPage.getBranchCount();
      expect(mapCount).toBe(3);
    });

    test('should display Contact Us section', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.contactHeading).toBeVisible();
    });

    test('should display contact table with 3 branches', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.contactTable).toBeVisible();

      const rowCount = await aboutPage.getContactTableRowCount();
      expect(rowCount).toBe(3);
    });

    test('should display correct branch names in contact table', async ({ page }) => {
      const aboutPage = new AboutUsPage(page);
      await aboutPage.goto();

      await expect(aboutPage.contactTableRows.nth(0)).toContainText('Wellspring Colombo');
      await expect(aboutPage.contactTableRows.nth(1)).toContainText('Wellspring Kandy');
      await expect(aboutPage.contactTableRows.nth(2)).toContainText('Wellspring Galle');
    });
  });