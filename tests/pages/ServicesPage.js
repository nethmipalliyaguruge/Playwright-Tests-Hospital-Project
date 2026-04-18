export class ServicesPage {
    constructor(page) {
      this.page = page;

      // Page Content
      this.pageHeading = page.getByRole('heading', { name: 'Services', exact: true });
      this.introText = page.getByText('Our hospital offers comprehensive');
      this.serviceCards = page.locator('.box-flex');
      this.serviceNames = page.locator('.service-name');

      // Individual Service Images
      this.emergencyCareImg = page.getByRole('img', { name: 'Picture of Emergency Care' });
      this.surgicalServicesImg = page.getByRole('img', { name: 'Picture of Surgical Services' });
      this.diagnosticImagingImg = page.getByRole('img', { name: 'Picture of Diagnostic Imaging' });
      this.maternityImg = page.getByRole('img', { name: 'Picture of Maternity and' });

      // Patient Registration Button
      this.patientRegButton = page.getByRole('button', { name: 'Click Here to fill the' });
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/services.html');
    }

    async getServiceCount() {
      return await this.serviceCards.count();
    }

    async getServiceNames() {
      return await this.serviceNames.allTextContents();
    }
  }