import { test, expect } from '@playwright/test';
  import { BillingPage } from './pages/BillingPage.js';

  test.describe('Billing Page', () => {

    test('should load the page with correct headings', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      await expect(billingPage.billingHeading).toBeVisible();
      await expect(billingPage.orderSummaryHeading).toBeVisible();
    });

    test('should display all personal detail fields', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      await expect(billingPage.nameInput).toBeVisible();
      await expect(billingPage.emailInput).toBeVisible();
      await expect(billingPage.contactInput).toBeVisible();
      await expect(billingPage.patientNoInput).toBeVisible();
    });

    test('should display payment detail fields', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      await expect(billingPage.addressInput).toBeVisible();
      await expect(billingPage.cityInput).toBeVisible();
      await expect(billingPage.postalInput).toBeVisible();
    });

    test('should display card detail fields', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      await expect(billingPage.creditRadio).toBeAttached();
      await expect(billingPage.debitRadio).toBeAttached();
      await expect(billingPage.cardNumberInput).toBeVisible();
      await expect(billingPage.expiryInput).toBeVisible();
      await expect(billingPage.cvvInput).toBeVisible();
    });

    test('should fill out the complete billing form', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      await billingPage.fillPersonalDetails({
        name: 'Nethmi Palliyaguruge',
        email: 'nethmi@gmail.com',
        contact: '0771234567',
        patientNo: '1001',
      });

      await billingPage.fillPaymentDetails({
        address: '114 Norris Canal Rd, Colombo',
        city: 'Colombo',
        postal: '01000',
      });

      await billingPage.fillCardDetails({
        method: 'Credit',
        cardNumber: '4111111111111111',
        expiry: '2027-12',
        cvv: '123',
      });

      // Verify some fields
      await expect(billingPage.nameInput).toHaveValue('Nethmi Palliyaguruge');
      await expect(billingPage.cityInput).toHaveValue('Colombo');
      await expect(billingPage.creditRadio).toBeChecked();
    });

    test('should reset the billing form', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      await billingPage.fillPersonalDetails({
        name: 'Test User',
        email: 'test@gmail.com',
        contact: '0771111111',
      });

      await billingPage.resetForm();

      await expect(billingPage.nameInput).toHaveValue('');
      await expect(billingPage.emailInput).toHaveValue('');
    });

    test('should show empty order summary when no cart items', async ({ page }) => {
      const billingPage = new BillingPage(page);
      await billingPage.goto();

      const grandTotal = await billingPage.orderGrandTotal.textContent();
      expect(grandTotal).toBe('Rs.0/=');
    });
  });