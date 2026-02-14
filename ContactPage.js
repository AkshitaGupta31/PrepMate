import React from 'react';
import './contact.css';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="contact-page-wrapper">
      <div className="contact-card">
        <div className="contact-left">
          <div className="contact-header">
            <h2>CONTACT</h2>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message" rows="4" />
            <button type="submit">SEND</button>
          </form>
        </div>
        <div className="contact-right">
          <div className="contact-info">
            <h3>INFO</h3>
            <div className="info-item">
              <Mail size={16} />
              <span>info@peermate.in</span>
            </div>
            <div className="info-item">
              <Phone size={16} />
              <span>+91 88589 64424</span>
            </div>
            <div className="info-item">
              <MapPin size={16} />
              <span>Adil Nagar, Lucknow</span>
            </div>
            <div className="info-item">
              <Clock size={16} />
              <span>09:00 - 18:00</span>
            </div>
          </div>
          <div className="contact-socials">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
        </div>
        </div>
      </div>
      
    </div>
  );
}
