import { test, expect } from '@playwright/test';
  import { DoctorsPage } from './pages/DoctorsPage.js';

  test.describe('Doctors Page', () => {

    test('should load the page with correct heading', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      await expect(doctorsPage.pageHeading).toBeVisible();
      await expect(page).toHaveTitle('Our Doctors');
    });

    test('should display intro text', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      await expect(doctorsPage.introText).toBeVisible();
    });

    test('should display exactly 4 doctors', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      const count = await doctorsPage.getDoctorCount();
      expect(count).toBe(4);
    });

    test('should display correct doctor names', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      const names = await doctorsPage.getDoctorNames();
      expect(names).toContain('Dr. Alex Middleton');
      expect(names).toContain('Dr.Taylor Windsor');
      expect(names).toContain('Dr.Jordan Rivers');
      expect(names).toContain('Dr.Casey Montgomery');
    });

    test('should display all doctor images', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      await expect(doctorsPage.drAlexImage).toBeVisible();
      await expect(doctorsPage.drTaylorImage).toBeVisible();
      await expect(doctorsPage.drJordanImage).toBeVisible();
      await expect(doctorsPage.drCaseyImage).toBeVisible();
    });

    test('should display doctor specializations', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      // Check specializations are mentioned in each card
      await expect(doctorsPage.doctorCards.nth(0)).toContainText('Cardiology');
      await expect(doctorsPage.doctorCards.nth(1)).toContainText('Neurology');
      await expect(doctorsPage.doctorCards.nth(2)).toContainText('Orthopedics');
      await expect(doctorsPage.doctorCards.nth(3)).toContainText('Pediatrics');
    });

    test('should display phone numbers for each doctor', async ({ page }) => {
      const doctorsPage = new DoctorsPage(page);
      await doctorsPage.goto();

      await expect(doctorsPage.doctorCards.nth(0)).toContainText('+94 71 234 5678');
      await expect(doctorsPage.doctorCards.nth(1)).toContainText('+94 74 567 8901');
      await expect(doctorsPage.doctorCards.nth(2)).toContainText('+94 72 345 6789');
      await expect(doctorsPage.doctorCards.nth(3)).toContainText('+94 73 456 7890');
    });
  });