export class AboutUsPage {
    constructor(page) {
      this.page = page;

      // Page Headings
      this.pageHeading = page.getByRole('heading', { name: 'About Us' });
      this.contactHeading = page.getByRole('heading', { name: 'Contact Us' });

      // Intro Text
      this.introText = page.getByText('At Wellspring Hospital, we are dedicated');

      // Branch Sections
      this.colomboHeading = page.getByRole('heading', { name: 'Wellspring Colombo' });
      this.kandyHeading = page.getByRole('heading', { name: 'Wellspring Kandy' });
      this.galleHeading = page.getByRole('heading', { name: 'Wellspring Galle' });

      // Branch Images
      this.colomboImage = page.getByRole('img', { name: 'Picture of Colombo Wellspring' });
      this.kandyImage = page.getByRole('img', { name: 'Picture of Kandy Wellspring' });
      this.galleImage = page.getByRole('img', { name: 'Picture of Galle Wellspring' });

      // Google Maps
      this.googleMaps = page.locator('iframe');

      // Contact Table
      this.contactTable = page.locator('#table-content');
      this.contactTableRows = page.locator('#table-content tbody tr');
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/about_us.html');
    }

    async getBranchCount() {
      return await this.googleMaps.count();
    }

    async getContactTableRowCount() {
      return await this.contactTableRows.count();
    }
  }