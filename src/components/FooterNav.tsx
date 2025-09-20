'use client';
import React, { useState } from 'react';
import styles from '@/components/FooterNav.module.css';
import Link from 'next/link';
import Navlink from './Nav-link';

const FooterNav = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>Delight-Dine-Resto</div>
        <div className={styles.section}>
          <ul>
            <li className={styles.link}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.link}>
              <Link href="/events">Events</Link>
            </li>
            <li className={styles.link}>
              <Navlink href="/contact">Contact Us</Navlink>
            </li>
            <li className={styles.link}>
              <Navlink href="/about">About Us</Navlink>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <p>Phone: (555) 123-4567</p>
          <p>Email: reservations@delightdineresto.com</p>
          <p>Address: 123 Flavor Street, Gourmet City, Foodland</p>
        </div>
        <div className={styles.socialMedia}>
          <a
            href="https://facebook.com"
            target="_blank"
            className={styles.link}
          >
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" className={styles.link}>
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className={styles.link}
          >
            Instagram
          </a>
        </div>
        <div className={styles.newsletterSignup}>
          {/* <input type="email" placeholder="Subscribe to our newsletter" /> */}
          <input
            type="email"
            placeholder="Subscribe to our newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            suppressHydrationWarning
          />
          <button suppressHydrationWarning>Subscribe</button>
        </div>
        <div className={styles.legal}>
          <p>&copy; 2024 DelightDine Hub Resto. All rights reserved.</p>
          <p>
            <a href="/privacy" className={styles.link}>
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="/terms" className={styles.link}>
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;
