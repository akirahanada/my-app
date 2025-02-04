// components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="contact-info">
          <h3>Contact Us</h3>
          <address>
            123 Mediterranean Avenue<br />
            Chicago, IL 60601<br />
            Phone: (312) 555-0123<br />
            Email: info@littlelemon.com
          </address>
        </section>
        
        <section className="social-links">
          <h3>Connect With Us</h3>
          <ul>
            <li><a href="https://facebook.com/littlelemon">Facebook</a></li>
            <li><a href="https://instagram.com/littlelemon">Instagram</a></li>
            <li><a href="https://twitter.com/littlelemon">Twitter</a></li>
          </ul>
        </section>
        
        <section className="opening-hours">
          <h3>Opening Hours</h3>
          <ul>
            <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
            <li>Saturday - Sunday: 10:00 AM - 11:00 PM</li>
          </ul>
        </section>
      </div>
      
      <div className="copyright">
        <p>&copy; 2025 Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;