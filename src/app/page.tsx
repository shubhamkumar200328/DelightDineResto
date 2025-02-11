import Header from "@/components/header"

import Link from "next/link"

import classes from "./page.module.css"
import ImageSlideshow from "@/components/images/image-slideshow"
import FooterNav from "@/components/FooterNav"

export default function Home() {
  return (
    <>
      <Header />
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>
              Welcome to DelightDine Hub Resto – A Symphony of Flavors Await.
            </h1>
            <p>
              "Join us at DelightDine Hub Resto, where every meal is a
              celebration of flavor, quality, and exceptional service. Come and
              taste the difference. Reserve Your Table and Explore Our Menu"
            </p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How DelightDine Hub Resto Works</h2>
          <p>
            From the moment you step through our doors, we aim to provide a
            seamless and extraordinary dining experience.
          </p>
          <ul>
            <li>
              Personalized Welcome: "Our friendly staff greets you with a warm
              welcome, ready to cater to your every need from the very start.
            </li>
            <li>
              Effortless Reservations: "Making a reservation is simple and
              convenient through our online booking system, ensuring you have a
              perfect table waiting for you.
            </li>
            <li>
              Tailored Dining: "Whether you’re here for a casual lunch or a
              special celebration, our team personalizes your dining experience
              to suit your preferences and needs.
            </li>
            <li>
              Culinary Journey: "Our chefs prepare each dish with passion and
              precision, using the freshest ingredients to create flavors that
              delight and inspire."
            </li>
            <li>
              Interactive Service: "Enjoy an engaging dining experience with
              knowledgeable servers who can recommend dishes and pairings to
              enhance your meal."
            </li>
            <li>
              Ambiance and Comfort: "Immerse yourself in a thoughtfully designed
              atmosphere that blends elegance with comfort, making every visit
              memorable."
            </li>
            <li>
              Efficient Ordering: "Experience swift and accurate service with
              our streamlined ordering process, ensuring you spend more time
              savoring your meal and less time waiting."
            </li>
            <li>
              Seamless Payment: "Conclude your visit with our easy and secure
              payment options, designed for your convenience."
            </li>
            <li>
              Feedback and Improvement: "We value your feedback and continuously
              strive to enhance your experience with every visit."
            </li>
          </ul>
          <p>
            "At DelightDine Hub Resto, we believe dining should be an
            experience, not just a meal. Join us for an unforgettable journey of
            flavors and hospitality."
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
      <div className=" mt-40">
        <FooterNav />
      </div>
    </>
  )
}
