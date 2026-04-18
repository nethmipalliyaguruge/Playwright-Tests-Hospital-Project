export class BillingPage {
    constructor(page) {
      this.page = page;

      // Headings
      this.billingHeading = page.getByRole('heading', { name: 'Billing Details' });
      this.orderSummaryHeading = page.getByRole('heading', { name: 'Order Summary' });

      // Order Summary
      this.orderSummaryBody = page.locator('#order-summary-body');
      this.orderGrandTotal = page.locator('#order-grand-total');

      // Personal Details
      this.nameInput = page.getByLabel('Name :');
      this.emailInput = page.getByLabel('Email :');
      this.contactInput = page.getByLabel('Conatct Number :');
      this.patientNoInput = page.getByLabel('Patient No :');

      // Payment Details
      this.addressInput = page.getByLabel('Address:');
      this.cityInput = page.getByLabel('City:');
      this.postalInput = page.getByLabel('Postal Code:');

      // Card Details
      this.creditRadio = page.locator('#radio1');
      this.debitRadio = page.locator('#radio2');
      this.cardNumberInput = page.getByLabel('Credit/Debit Card Number:');
      this.expiryInput = page.getByLabel('Expiry Date:');
      this.cvvInput = page.getByLabel('CVV:');

      // Buttons
      this.resetButton = page.getByRole('button', { name: 'Reset' });
      this.payButton = page.getByRole('button', { name: 'Pay' });
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/billing_page.html');
    }

    async fillPersonalDetails({ name, email, contact, patientNo }) {
      if (name) await this.nameInput.fill(name);
      if (email) await this.emailInput.fill(email);
      if (contact) await this.contactInput.fill(contact);
      if (patientNo) await this.patientNoInput.fill(patientNo);
    }

    async fillPaymentDetails({ address, city, postal }) {
      if (address) await this.addressInput.fill(address);
      if (city) await this.cityInput.fill(city);
      if (postal) await this.postalInput.fill(postal);
    }

    async fillCardDetails({ method, cardNumber, expiry, cvv }) {
      if (method === 'Credit') await this.creditRadio.dispatchEvent('click');
      if (method === 'Debit') await this.debitRadio.dispatchEvent('click');
      if (cardNumber) await this.cardNumberInput.fill(cardNumber);
      if (expiry) await this.expiryInput.fill(expiry);
      if (cvv) await this.cvvInput.fill(cvv);
    }

    async clickPay() {
      await this.payButton.click();
    }

    async resetForm() {
      await this.resetButton.click();
    }
  }