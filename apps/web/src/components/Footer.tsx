export default function Footer() {
  return (
  <>
    <div className="row">
      <div className="col-lg-3 col-md-6">
        <div className="footer-widget footer-about">
          <div className="footer-logo">
            <img src="https://www.quickobook.com/assets/img/logo4.png" className="img-fluid" alt="logo">
          </div>
          <div className="footer-about-content">
            <p>QuickoBook is a registered start up company empaneled with 10000+ Doctors, 500+ Hospitals, lives touched of more than 2 Million patients.</p>
            <div className="social-icon">
              <ul>
                <li>
                  <a href="https://www.facebook.com/quickobook/?ref=page_internal" target="_blank"><i className="fab fa-facebook-f"></i> </a>
                </li>
                <li>
                  <a href="https://x.com/Quicko_book" target="_blank"><i className="fab fa-twitter"></i> </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/qwkpro" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/quick.obook/" target="_blank"><i className="fab fa-instagram"></i></a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@quickobook2886" target="_blank"><i className="fab fa-youtube"></i> </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="footer-widget footer-menu">
          <h2 className="footer-title">For Information</h2>
          <ul>
            <li><a href="https://www.quickobook.com/about">About Us</a></li>
            <li><a href="https://youtu.be/4abdBRWh6k0">Booking Guide</a></li>
            <li><a href="https://pharmacy.quickobook.com/">Pharmacy</a></li>
            <li><a href="https://www.quickobook.com/careers">Careers</a></li>
            <li><a href="https://www.quickobook.com/press_release">Press Release</a></li>
            <li><a href="https://www.quickobook.com/faq">FAQ'S</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="footer-widget footer-menu">
          <h2 className="footer-title">Helpful Links</h2>
          <ul>
            <li><a href="https://www.quickobook.com/search">Book Appointment</a></li>
            <li><a href="https://www.quickobook.com/search">Search for doctors</a></li>
            <li><a href="https://www.quickobook.com/hospitals">Search for hospitals </a></li>
            <li><a href="https://www.quickobook.com/book-test">Book Lab/Diagnostics Test</a></li>
            <li><a href="https://www.quickobook.com/franchisee">Franchisee Register</a></li>
            <li><a href="https://www.quickobook.com/">SMS Booking</a></li>
            <li><a href="https://www.quickobook.com/">Services</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="footer-widget footer-contact">
          <h2 className="footer-title">Contact Us</h2>
          <div className="footer-contact-info">
            <div className="footer-address">
              <span><i className="fas fa-map-marker-alt"></i></span>
              <p> QWKPRO CONSULTANCY PVT LTD,<br> Silchar, Assam </p>
            </div>
            <p>
              <i className="fas fa-phone-alt"></i>
              +91 943 520 0024
            </p>
            <p className="mb-0">
              Customer Support :<br>
              <i className="fas fa-envelope"></i>
              support@quickobook.com<br><br>
              Official Queries :<br>
              <i className="fas fa-envelope"></i>
              info@quickobook.com
            </p>
          </div>
        </div>
      </div>
  </div>    
  </>
);
}