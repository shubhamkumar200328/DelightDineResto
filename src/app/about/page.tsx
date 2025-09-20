import React from 'react';
import classes from '@/app/about/page.module.css';

import Image from 'next/image';
import restaurants from '@/assets/restaurants.jpg';
import David_Martinez from '@/app/about/assets/David Martinez.jpg';
import Sarah_Thompson from '@/app/about/assets/Sarah_Thompson.jpg';
import Michael_Carter from '@/app/about/assets/Michael_Carter.jpg';
import Emily_Davis from '@/app/about/assets/Emily_Davis.jpg';
import James_Rodriguez from '@/app/about/assets/James Rodriguez.jpg';

function page() {
  return (
    <>
      <div className={classes.divSection}>
        <h1 className={classes.aboutH1}>About Us</h1>
        <ul>
          <li className={classes.restoClass}>
            <div>
              <Image
                src={restaurants}
                alt="restaurants"
                className={classes.restoImg}
                priority
              />
            </div>

            <div className={classes.restoIntroP}>
              <h1>Introduction: </h1>
              Welcome to Delight-Dine-Resto, where culinary artistry meets a
              warm and inviting atmosphere. Established in 1985, our restaurant
              was founded with a passion for creating memorable dining
              experiences. Our mission is to offer exceptional food, impeccable
              service, and a welcoming environment that makes every guest feel
              like family. At Delight-Dine-Resto, we value quality, creativity,
              and sustainability, striving to provide a dining experience that
              delights the senses and nourishes the soul.
            </div>
          </li>
          <li>
            <br />
            <p>Chef&apos;s Bio: </p>
            <p>Chef David Martinez - Our Culinary Maestro</p>
            With over 5 years of culinary experience, Chef David Martinez leads
            the kitchen at Delight-Dine-Resto with unparalleled expertise and
            creativity. Trained at Prestigious Culinary School and having worked
            in renowned kitchens around the world, Chef David Martinez brings a
            unique blend of traditional techniques and innovative flair to our
            menu. His passion for fresh, locally-sourced ingredients and his
            commitment to culinary excellence are evident in every dish.
            <br />
            <Image
              src={David_Martinez}
              alt="David_Martinez"
              className={classes.aboutImg}
              priority
            />
          </li>
          <li>
            <br />
            <p>Team Introduction: </p>
            <br />
            Our dedicated team is the heart and soul of DelightDine Hub Resto.
            Each member brings a wealth of experience and a shared commitment to
            excellence, ensuring that every guest has a memorable dining
            experience.
            <br />
            <ul>
              <li>
                <p>Sarah Thompson - General Manager</p>
                With a background in hospitality management and a love for
                exceptional service, Sarah Thompson ensures that every aspect of
                your visit runs smoothly. <br />
                <Image
                  src={Sarah_Thompson}
                  alt="Sarah_Thompson"
                  className={classes.aboutImg}
                  priority
                />
              </li>
              <li>
                <p>Michael Carter - Sous Chef</p>
                Michael Carter supports the head chef with a keen eye for detail
                and a passion for creativity in the kitchen. <br />
                <Image
                  src={Michael_Carter}
                  alt="Michael_Carter"
                  className={classes.aboutImg}
                  priority
                />
              </li>
              <li>
                <p> Emily Davis - Sommelier</p>
                Our resident wine expert, Emily Davis, curates our extensive
                wine list and offers expert pairings to enhance your meal.{' '}
                <br />
                <Image
                  src={Emily_Davis}
                  alt="Emily_Davis"
                  className={classes.aboutImg}
                  priority
                />
              </li>
              <li>
                <p>James Rodriguez - Front of House Manager</p>
                James Rodriguez ensures a warm and welcoming atmosphere from the
                moment you step through our doors. <br />
                <Image
                  src={James_Rodriguez}
                  alt="James_Rodriguez"
                  className={classes.aboutImg}
                  priority
                />
              </li>
            </ul>
          </li>
          <li>
            <p>Ambiance Description: </p>
            At DelightDine Hub Resto, we have meticulously designed our interior
            to create an ambiance that is both elegant and comfortable. The warm
            lighting, stylish decor, and thoughtfully arranged seating provide
            the perfect setting for any occasion, whether it&apos;s an intimate
            dinner, a family gathering, or a special celebration. Our inviting
            atmosphere is complemented by soft music and the enticing aromas of
            our expertly prepared dishes, making every visit a feast for the
            senses. Come and experience the unique vibe of DelightDine Hub
            Resto, where exceptional food and a welcoming environment come
            together to create unforgettable memories.
          </li>
        </ul>
      </div>
    </>
  );
}

export default page;
