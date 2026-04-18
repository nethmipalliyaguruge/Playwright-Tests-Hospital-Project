export class DoctorsPage {
    constructor(page) {
      this.page = page;

      // Page Content
      this.pageHeading = page.getByRole('heading', { name: 'Our Doctors', exact: true });
      this.introText = page.getByText('At Wellspring Hospital, our doctors are leaders');
      this.doctorCards = page.locator('.container-box');

      // Individual Doctor Names
      this.drAlexHeading = page.getByRole('heading', { name: 'Dr. Alex Middleton' });
      this.drTaylorHeading = page.getByRole('heading', { name: 'Dr.Taylor Windsor' });
      this.drJordanHeading = page.getByRole('heading', { name: 'Dr.Jordan Rivers' });
      this.drCaseyHeading = page.getByRole('heading', { name: 'Dr.Casey Montgomery' });

      // Doctor Images
      this.drAlexImage = page.getByRole('img', { name: 'Picture of the Dr.Alex' });
      this.drTaylorImage = page.getByRole('img', { name: 'Picture of the Dr.Taylor' });
      this.drJordanImage = page.getByRole('img', { name: 'Picture of the Dr.Jordan' });
      this.drCaseyImage = page.getByRole('img', { name: 'Picture of the Dr.Casey' });
    }

    async goto() {
      await this.page.goto('/Hospital-Project-CB015790/doctors.html');
    }

    async getDoctorCount() {
      return await this.doctorCards.count();
    }

    async getDoctorNames() {
      return await this.doctorCards.locator('.smaller-heading').allTextContents();
    }
  }