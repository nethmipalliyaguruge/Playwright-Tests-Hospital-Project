import { test, expect } from '@playwright/test';
  import { ServicesPage } from './pages/ServicesPage.js';

  test.describe('Services Page', () => {

    test('should load the page with correct heading', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      await expect(servicesPage.pageHeading).toBeVisible();
      await expect(page).toHaveTitle('Services');
    });

    test('should display intro text', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      await expect(servicesPage.introText).toBeVisible();
    });

    test('should display exactly 4 services', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      const count = await servicesPage.getServiceCount();
      expect(count).toBe(4);
    });

    test('should display correct service names', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      const names = await servicesPage.getServiceNames();
      expect(names).toEqual([
        'Emergency Care',
        'Surgical Services',
        'Diagnostic Imaging',
        'Maternity and Neonatal Care',
      ]);
    });

    test('should display all service images', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      await expect(servicesPage.emergencyCareImg).toBeVisible();
      await expect(servicesPage.surgicalServicesImg).toBeVisible();
      await expect(servicesPage.diagnosticImagingImg).toBeVisible();
      await expect(servicesPage.maternityImg).toBeVisible();
    });

    test('should have a Patient Registration button', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      await expect(servicesPage.patientRegButton).toBeVisible();
    });

    test('should navigate to Patient Registration when button is clicked', async ({ page }) => {
      const servicesPage = new ServicesPage(page);
      await servicesPage.goto();

      await servicesPage.patientRegButton.click();

      await expect(page).toHaveTitle('Patient Registration');
    });
  });