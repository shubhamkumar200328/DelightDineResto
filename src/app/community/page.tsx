import React from 'react';
import classes from '@/app/community/page.module.css';
import Image from 'next/image';
import communityPerks from '@/app/community/assets/community Perks.jpg';
import share_discover from '@/app/community/assets/discover recipes.jpg';
import likemindedpeople from '@/app/community/assets/like-minded people.jpg';

function page() {
  return (
    <>
      <div className={classes.divSection}>
        <h1>
          One shared passion: <span>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
        <ul>
          <li>
            <div>Community Perks</div>
            <Image
              src={communityPerks}
              alt="communityPerks"
              className={classes.comImage}
            />
          </li>
          <li>
            <div>Share & discover recipes</div>
            <Image
              src={share_discover}
              alt="share_discover"
              className={classes.comImage}
            />
          </li>
          <li>
            <div>Find new friends & like-minided people</div>
            <Image
              src={likemindedpeople}
              alt="likemindedpeople"
              className={classes.comImage}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default page;
