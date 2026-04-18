export class ConsultingReservationPage {
    constructor(page) {
      this.page = page;

      // Page Heading
      this.pageHeading = page.getByRole('heading', { name: 'Consulting Reservation' });

      // Form Fields
      this.nameInput = page.getByLabel('Name :');
      this.emailInput = page.getByLabel('Email :');
      this.contactInput = page.getByLabel('Conatct Number :');
      this.patientNoInput = page.getByLabel('Patient No :');
      this.doctorSelect = page.getByLabel('Select the Doctor :');
      this.dateInput = page.getByLabel('Preferred Date :');

      // Buttons
      this.submitButton = page.getByRole('button', { name: 'Submit' });
      this.resetButton = page.getByRole('button', { name: 'Reset' });
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/consulting_reservation.html');
    }

    async fillReservationForm({ name, email, contact, patientNo, doctor, date }) {
      if (name) await this.nameInput.fill(name);
      if (email) await this.emailInput.fill(email);
      if (contact) await this.contactInput.fill(contact);
      if (patientNo) await this.patientNoInput.fill(patientNo);
      if (doctor) await this.doctorSelect.selectOption(doctor);
      if (date) await this.dateInput.fill(date);
    }

    async submitForm() {
      await this.submitButton.click();
    }

    async resetForm() {
      await this.resetButton.click();
    }

    async getDoctorOptions() {
      return await this.doctorSelect.locator('option').allTextContents();
    }
  }