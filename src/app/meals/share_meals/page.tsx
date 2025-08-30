// share_meals/page.tsx
'use client';

import React from 'react';
import styles from './page.module.css';

import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function ShareMealsPage() {
  const handleShare = (platform: string) => {
    let url = '';

    switch (platform) {
      case 'WhatsApp':
        url = `https://wa.me/?text=Check%20out%20this%20meal%20sharing%20app!`;
        break;
      case 'Instagram':
        url = `https://www.instagram.com/`;
        break;
      case 'LinkedIn':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=https://example.com`;
        break;
      case 'Contact':
        url = `mailto:support@example.com?subject=Meal Sharing Inquiry`;
        break;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  const platforms = [
    { name: 'WhatsApp', icon: <FaWhatsapp color="#25D366" /> },
    { name: 'Instagram', icon: <FaInstagram color="#E1306C" /> },
    { name: 'LinkedIn', icon: <FaLinkedin color="#0A66C2" /> },
    { name: 'Contact', icon: <MdEmail color="#EA4335" /> },
  ];

  return (
    <div>
      <div className={styles.shareSection}>
        <h1 className={styles.shareTitle}>Share Meals</h1>
        <div className={styles.container}>
          <ul className={styles.platformList}>
            {platforms.map((platform) => (
              <li
                key={platform.name}
                className={styles.platformItem}
                onClick={() => handleShare(platform.name)}
              >
                <span className={styles.icon}>{platform.icon}</span>
                <span>{platform.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShareMealsPage;
