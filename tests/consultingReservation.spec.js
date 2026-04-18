import { test, expect } from '@playwright/test';
  import { ConsultingReservationPage } from './pages/ConsultingReservationPage.js';

  test.describe('Consulting Reservation Page', () => {

    test('should load the page with correct heading', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      await expect(consultPage.pageHeading).toBeVisible();
      await expect(page).toHaveTitle('Consulting Reservation');
    });

    test('should display all form fields', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      await expect(consultPage.nameInput).toBeVisible();
      await expect(consultPage.emailInput).toBeVisible();
      await expect(consultPage.contactInput).toBeVisible();
      await expect(consultPage.patientNoInput).toBeVisible();
      await expect(consultPage.doctorSelect).toBeVisible();
      await expect(consultPage.dateInput).toBeVisible();
    });

    test('should have correct doctor options in dropdown', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      const options = await consultPage.getDoctorOptions();
      expect(options).toContain('--Select--');
      expect(options).toContain('Dr.Alex Middleton');
      expect(options).toContain('Dr.Taylor Windsor');
      expect(options).toContain('Dr.Jordan Rivers');
      expect(options).toContain('Dr.Casey Montgomery');
    });

    test('should fill out the reservation form', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      await consultPage.fillReservationForm({
        name: 'Nethmi Palliyaguruge',
        email: 'nethmi@gmail.com',
        contact: '0771234567',
        patientNo: '1001',
        doctor: 'Dr_Alex_Middleton',
        date: '2026-05-20',
      });

      // Verify fields
      await expect(consultPage.nameInput).toHaveValue('Nethmi Palliyaguruge');
      await expect(consultPage.emailInput).toHaveValue('nethmi@gmail.com');
      await expect(consultPage.doctorSelect).toHaveValue('Dr_Alex_Middleton');
    });

    test('should select different doctors from dropdown', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      // Select Dr.Taylor Windsor
      await consultPage.doctorSelect.selectOption('Dr_Taylor_Windsor');
      await expect(consultPage.doctorSelect).toHaveValue('Dr_Taylor_Windsor');

      // Change to Dr.Casey Montgomery
      await consultPage.doctorSelect.selectOption('Dr_Casey_Montgomery');
      await expect(consultPage.doctorSelect).toHaveValue('Dr_Casey_Montgomery');
    });

    test('should reset the form', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      await consultPage.fillReservationForm({
        name: 'Test User',
        email: 'test@gmail.com',
        contact: '0771111111',
      });

      await consultPage.resetForm();

      await expect(consultPage.nameInput).toHaveValue('');
      await expect(consultPage.emailInput).toHaveValue('');
      await expect(consultPage.contactInput).toHaveValue('');
    });

    test('should show validation when submitting empty required fields', async ({ page }) => {
      const consultPage = new ConsultingReservationPage(page);
      await consultPage.goto();

      await consultPage.submitForm();

      // Should stay on the same page due to HTML5 validation
      await expect(page).toHaveTitle('Consulting Reservation');
    });
  });