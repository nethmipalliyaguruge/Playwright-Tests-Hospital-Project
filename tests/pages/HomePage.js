export class HomePage {
    constructor(page) {
      this.page = page;

      // Header
      this.logo = page.getByRole('link', { name: 'Picture of the logo' });
      this.emergencyCall = page.getByText('Emergency call');
      this.cartIcon = page.getByRole('link', { name: 'Go to cart' });
      this.cartCount = page.locator('#cart-count');

      // Navigation
      this.navHome = page.getByRole('link', { name: 'Home' });
      this.navAboutUs = page.getByRole('link', { name: 'About Us', exact: true });
      this.navServices = page.getByRole('link', { name: 'Services', exact: true });
      this.navDoctors = page.getByRole('link', { name: 'Our Doctors' });
      this.navConsulting = page.getByRole('link', { name: 'Consulting Reservation' });
      this.navPharmacy = page.getByRole('link', { name: 'Pharmacy' });

      // Main Content
      this.heroHeading = page.getByRole('heading', { name: 'Bringing healthcare closer to' });
      this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to Wellspring Hospital' });
      this.welcomeText = page.locator('#welcome-msg p');
      this.patientResourcesHeading = page.getByRole('heading', { name: 'Patient Resources' });
      this.whyChooseUsHeading = page.getByRole('heading', { name: 'Why Choose us ?' });
      this.patientRegistrationLink = page.getByRole('link', { name: 'Patient Registration' });

      // Footer
      this.footerLogo = page.getByRole('img', { name: 'picture of the logo', exact: true });
      this.footerContactUs = page.getByText('Contact Us');
      this.footerBranches = page.getByText('Our Branches');
      this.copyrightText = page.locator('footer p');
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/');
    }

    async clickNavLink(linkName) {
      const links = {
        'Home': this.navHome,
        'About Us': this.navAboutUs,
        'Services': this.navServices,
        'Our Doctors': this.navDoctors,
        'Consulting Reservation': this.navConsulting,
        'Pharmacy': this.navPharmacy,
      };
      await links[linkName].click();
    }

    async getPageTitle() {
      return await this.page.title();
    }
  }