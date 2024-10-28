import React from "react";
import "./Footer.css"; // Ensure you have this CSS file imported
import { Link } from "react-router-dom";
import footer1img from "../../../assets/images/footer1.png";
import footercontactimg from "../../../assets/images/footercontactfull.png";
import footerdividerimg from "../../../assets/images/footerdivider.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Import social icons

const Footer = () => {
  return (
    <div className="footerspace">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src={footer1img} alt="" />
            <hr className="footerdivider" />
          </div>

          <div className="footer-section logo-section">
            <h4 className="foote-logo">Contact us</h4>
            <div className="contact-info mt-4">
              <p>
                If you have any questions, please contact us at
                <a className="amaincolor" href="mailto:support@example.com">
                  support@shoesmart.com
                </a>
              </p>
              <div className="contact-item">
                <img
                  src={footercontactimg}
                  alt="Contact Icon"
                  className="contact-icon"
                />
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li>
                <Link to="/category/men">For Men</Link>
              </li>
              <li>
                <Link to="/category/women">For Women</Link>
              </li>
              <li>
                <Link to="/category/accessories">Accessories</Link>
              </li>
              <li>
                <Link to="/category/collections">Collections</Link>
              </li>
              <li>
                <Link to="/category/sales">Other</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Help</h4>
            <ul className="footer-help">
              <li>
                <Link to="/help">Get Help</Link>
              </li>
              <li>
                <Link to="/order-status">Order Status</Link>
              </li>
              <li>
                <Link to="/delivery">Delivery</Link>
              </li>
              <li>
                <Link to="/returns">Returns</Link>
              </li>
              <li>
                <Link to="/payment-options">Payment Options</Link>
              </li>
            </ul>
          </div>

          {/* Proper divider added here */}
          <div className="footer-divider-container">
            <img src={footerdividerimg} alt="" />
          </div>

          <div className="footer-section">
            <h4>Newsletter Subscription</h4>
            <p>Subscribe to the weekly newsletter for all the latest updates</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <hr className="footer-bottom-divider" />
        <div className="footer-bottom d-flex justify-content-between align-items-center">
          <p>
            Copyright &copy; {new Date().getFullYear()} shoesmart. All Rights
            Reserved.
          </p>

          <div className="footer-social-icons text-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

// import React from "react";
// import "./Footer.css";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div className="footer">
//       <h4 className="text-center">All Right Reserved &copy; Dhruv</h4>
//       <p className="text-center mt-3">
//         <Link to="/about">About</Link>|<Link to="/contact">Contact</Link> |
//         <Link to="/policy">Privacy Policy</Link>
//       </p>
//     </div>
//   );
// };

// export default Footer;
