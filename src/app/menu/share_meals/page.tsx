'use client';

import React from 'react';
import styles from './page.module.css';

import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function ShareMealsPage() {
  const appUrl = 'https://delight-dine-resto.vercel.app/';

  const handleShare = (platform: string) => {
    let url = '';
    const encodedAppUrl = encodeURIComponent(appUrl);
    const shareText = `Check out this amazing meal sharing community: ${appUrl}`;
    const encodedShareText = encodeURIComponent(shareText);

    switch (platform) {
      case 'WhatsApp':
        url = `https://wa.me/?text=${encodedShareText}`;
        break;
      case 'Instagram':
        // Note: Instagram doesn't support direct web sharing.
        url = `https://www.instagram.com/`;
        break;
      case 'LinkedIn':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedAppUrl}`;
        break;
      case 'Contact':
        const subject = encodeURIComponent('Check out this Meal Sharing App');
        url = `mailto:?subject=${subject}&body=${encodedShareText}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
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
