import { test, expect } from '@playwright/test';
  import { PatientRegistrationPage } from './pages/PatientRegistrationPage.js';

  test.describe('Patient Registration Page', () => {

    test('should load the page with correct heading', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      await expect(regPage.pageHeading).toBeVisible();
      await expect(page).toHaveTitle('Patient Registration');
    });

    test('should display all patient detail fields', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      await expect(regPage.nameInput).toBeVisible();
      await expect(regPage.emailInput).toBeVisible();
      await expect(regPage.contactInput).toBeVisible();
      await expect(regPage.dobInput).toBeVisible();
    });

    test('should display gender radio buttons', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      await expect(regPage.genderMale).toBeAttached();
      await expect(regPage.genderFemale).toBeAttached();
      await expect(regPage.genderOther).toBeAttached();
    });

    test('should display marital status radio buttons', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      await expect(regPage.maritalSingle).toBeAttached();
      await expect(regPage.maritalMarried).toBeAttached();
      await expect(regPage.maritalDivorced).toBeAttached();
      await expect(regPage.maritalWidow).toBeAttached();
    });

    test('should display emergency contact fields', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      await expect(regPage.emergencyName).toBeVisible();
      await expect(regPage.emergencyContact).toBeVisible();
      await expect(regPage.emergencyRelationship).toBeVisible();
    });

    test('should fill out the full registration form', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      // Fill patient details
      await regPage.fillPatientDetails({
        name: 'Nethmi Palliyaguruge',
        email: 'nethmi@gmail.com',
        contact: '0771234567',
        dob: '2000-05-15',
      });

      // Select gender and marital status
      await regPage.selectGender('Female');
      await regPage.selectMaritalStatus('Single');

      // Fill insurance
      await regPage.insuranceInput.fill('AIA Insurance');

      // Select medications
      await regPage.medicationsNo.dispatchEvent('click');

      // Fill emergency contact
      await regPage.fillEmergencyContact({
        name: 'John Doe',
        contact: '0779876543',
        relationship: 'Father',
      });

      // Verify all fields are filled correctly
      await expect(regPage.nameInput).toHaveValue('Nethmi Palliyaguruge');
      await expect(regPage.emailInput).toHaveValue('nethmi@gmail.com');
      await expect(regPage.contactInput).toHaveValue('0771234567');
      await expect(regPage.genderFemale).toBeChecked();
      await expect(regPage.maritalSingle).toBeChecked();
      await expect(regPage.medicationsNo).toBeChecked();
      await expect(regPage.emergencyName).toHaveValue('John Doe');
    });

    test('should reset the form when reset button is clicked', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      // Fill some fields
      await regPage.fillPatientDetails({
        name: 'Test User',
        email: 'test@gmail.com',
        contact: '0771111111',
      });

      // Click reset
      await regPage.resetForm();

      // Verify fields are cleared
      await expect(regPage.nameInput).toHaveValue('');
      await expect(regPage.emailInput).toHaveValue('');
      await expect(regPage.contactInput).toHaveValue('');
    });

    test('should show validation when submitting empty required fields', async ({ page }) => {
      const regPage = new PatientRegistrationPage(page);
      await regPage.goto();

      // Try to submit without filling required fields
      await regPage.submitForm();

      // The form should not navigate away (HTML5 validation prevents submission)
      await expect(page).toHaveTitle('Patient Registration');
    });
  });