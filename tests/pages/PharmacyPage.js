export class PharmacyPage {
    constructor(page) {
      this.page = page;

      // Page Content
      this.pageHeading = page.getByRole('heading', { name: 'Pharmacy', exact: true });
      this.pageDescription = page.getByText('Order your medicines online');
      this.medicineContainer = page.locator('#medicine-container');
      this.medicineCards = page.locator('.medicine-card');
      this.categoryHeadings = page.locator('.ph-h2');

      // Cart Section
      this.cartHeading = page.getByRole('heading', { name: 'Cart items' });
      this.cartTableBody = page.locator('#cart-section table.table-content tbody');
      this.grandTotal = page.locator('#grand-total');

      // Cart Buttons
      this.resetCartButton = page.getByRole('button', { name: 'Reset Cart' });
      this.addToFavButton = page.getByRole('button', { name: 'Add To Favourites' });
      this.applyFavButton = page.getByRole('button', { name: 'Apply Favourites' });
      this.resetFavButton = page.getByRole('button', { name: 'Reset Favourites' });
      this.buyNowButton = page.getByRole('button', { name: 'Buy Now' });
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/pharmacy.html');
      await this.medicineContainer.locator('.medicine-card').first().waitFor();
    }

    async getMedicineCardCount() {
      return await this.medicineCards.count();
    }

    async getCategoryNames() {
      return await this.categoryHeadings.allTextContents();
    }

    async addMedicineToCart(medicineName, quantity = 1) {
      const card = this.medicineCards.filter({ hasText: medicineName });
      if (quantity !== 1) {
        await card.locator('.quantity').fill(String(quantity));
      }
      this.page.once('dialog', dialog => dialog.accept());
      await card.getByRole('button', { name: 'Add to Cart' }).click();
    }

    async getCartItemCount() {
      return await this.cartTableBody.locator('tr').count();
    }

    async getGrandTotal() {
      return await this.grandTotal.textContent();
    }

    async resetCart() {
      this.page.once('dialog', dialog => dialog.accept());
      await this.resetCartButton.click();
    }
  }