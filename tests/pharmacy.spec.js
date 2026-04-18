import { test, expect } from '@playwright/test';
  import { PharmacyPage } from './pages/PharmacyPage.js';

  test.describe('Pharmacy Page', () => {

    test('should load the page with correct heading', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      await expect(pharmacyPage.pageHeading).toBeVisible();
      await expect(page).toHaveTitle('Pharmacy');
    });

    test('should display the pharmacy description', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      await expect(pharmacyPage.pageDescription).toBeVisible();
    });

    test('should display all 5 medicine categories', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      const categories = await pharmacyPage.getCategoryNames();
      expect(categories).toEqual([
        'Analgesics',
        'Antibiotics',
        'Antidepressants',
        'Antihistamines',
        'Antihypertensives',
      ]);
    });

    test('should display 30 medicine cards (6 per category)', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      const count = await pharmacyPage.getMedicineCardCount();
      expect(count).toBe(30);
    });

    test('should display cart section', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      await expect(pharmacyPage.cartHeading).toBeVisible();
      await expect(pharmacyPage.resetCartButton).toBeVisible();
      await expect(pharmacyPage.buyNowButton).toBeVisible();
    });

    test('should add a medicine to cart', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      // Add Paracetamol to cart
      await pharmacyPage.addMedicineToCart('Paracetamol (500 mg)');

      // Check cart has 1 item
      const cartCount = await pharmacyPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });

    test('should add multiple medicines to cart', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      await pharmacyPage.addMedicineToCart('Paracetamol (500 mg)');
      await pharmacyPage.addMedicineToCart('Ibuprofen (200 mg)');

      const cartCount = await pharmacyPage.getCartItemCount();
      expect(cartCount).toBe(2);
    });

    test('should add medicine with custom quantity', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      // Add 5 Paracetamol tablets
      await pharmacyPage.addMedicineToCart('Paracetamol (500 mg)', 5);

      // Grand total should be Rs.5/= (price 1 x quantity 5)
      const grandTotal = await pharmacyPage.getGrandTotal();
      expect(grandTotal).toBe('Rs.5/=');
    });

    test('should reset the cart', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      // Add an item then reset
      await pharmacyPage.addMedicineToCart('Paracetamol (500 mg)');
      await pharmacyPage.resetCart();

      // Cart should be empty
      const grandTotal = await pharmacyPage.getGrandTotal();
      expect(grandTotal).toBe('Rs.0/=');
    });

    test('should display grand total as Rs.0/= when cart is empty', async ({ page }) => {
      const pharmacyPage = new PharmacyPage(page);
      await pharmacyPage.goto();

      const grandTotal = await pharmacyPage.getGrandTotal();
      expect(grandTotal).toBe('Rs.0/=');
    });
  });