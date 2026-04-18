export class PatientRegistrationPage {
    constructor(page) {
      this.page = page;

      // Page Heading
      this.pageHeading = page.getByRole('heading', { name: 'Patient Registration' });

      // Patient Details Fields
      this.nameInput = page.getByLabel('Name :', { exact: true }).first();
      this.emailInput = page.getByLabel('Email :');
      this.contactInput = page.getByLabel('Conatct Number :');
      this.dobInput = page.getByLabel('Date of Birth :');

      // Gender Radio Buttons
      this.genderMale = page.locator('#radio1');
      this.genderFemale = page.locator('#radio2');
      this.genderOther = page.locator('#radio3');

      // Marital Status Radio Buttons
      this.maritalSingle = page.locator('#radio4');
      this.maritalMarried = page.locator('#radio5');
      this.maritalDivorced = page.locator('#radio6');
      this.maritalWidow = page.locator('#radio7');

      // Other Fields
      this.insuranceInput = page.getByLabel('Insurance Name :');
      this.medicationsYes = page.locator('#radio8');
      this.medicationsNo = page.locator('#radio9');
      this.fileUpload = page.getByLabel('If yes, upload the past');

      // Emergency Contact Fields
      this.emergencyName = page.locator('#e_name');
      this.emergencyContact = page.locator('#contact2');
      this.emergencyRelationship = page.getByLabel('Relationship :');

      // Buttons
      this.submitButton = page.getByRole('button', { name: 'Submit' });
      this.resetButton = page.getByRole('button', { name: 'Reset' });
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/patient_registration.html');
    }

    async fillPatientDetails({ name, email, contact, dob }) {
      if (name) await this.nameInput.fill(name);
      if (email) await this.emailInput.fill(email);
      if (contact) await this.contactInput.fill(contact);
      if (dob) await this.dobInput.fill(dob);
    }

    async selectGender(gender) {
      const genders = { 'Male': this.genderMale, 'Female': this.genderFemale, 'Other': this.genderOther };
      await genders[gender].dispatchEvent('click');
    }

    async selectMaritalStatus(status) {
      const statuses = { 'Single': this.maritalSingle, 'Married': this.maritalMarried, 'Divorced': this.maritalDivorced, 'Widow': this.maritalWidow };
      await statuses[status].dispatchEvent('click');
    }

    async fillEmergencyContact({ name, contact, relationship }) {
      if (name) await this.emergencyName.fill(name);
      if (contact) await this.emergencyContact.fill(contact);
      if (relationship) await this.emergencyRelationship.fill(relationship);
    }

    async submitForm() {
      await this.submitButton.click();
    }

    async resetForm() {
      await this.resetButton.click();
    }
  }