import React from "react"
import classes from "@/app/reservation/page.module.css"
import Header from "@/components/header"
import Link from "next/link"
import FooterNav from "@/components/FooterNav"

function page() {
  return (
    <>
      <Header />
      <div className={classes.divSection}>
        <h1>Reservations Section</h1>
        <h2>
          Reserve your table today and enjoy an unforgettable culinary journey
          at DelightDine Hub Resto!
        </h2>
        <p>
          <span>Online Booking System: </span>At DelightDine Hub Resto, we make
          it easy for you to reserve your table. Our online booking system is
          designed to be simple and intuitive, ensuring a hassle-free
          reservation process. Just select your preferred date, time, and party
          size, and you'll be all set for a delightful dining experience with
          us. Our friendly staff is always ready to assist you with your
          reservation and ensure you have a wonderful dining experience at
          DelightDine Hub Resto.
        </p>
        <p>
          <span>Special Requests:</span> We understand that every guest is
          unique, and we are committed to making your visit special. Our
          reservation form includes options for you to specify any dietary
          restrictions, allergies, or special requests. Whether you're
          celebrating a birthday, anniversary, or any other special occasion,
          let us know, and we will do our best to accommodate your needs and
          make your visit memorable.
        </p>
        <p>
          <span>Contact Details:</span> If you prefer to make your reservation
          over the phone or have any questions, feel free to contact us
          directly: <br />
          Phone: (555) 123-4567 <br />
          Email: reservations@delightdinehub.com
        </p>
        <p className={classes.BooTable}>
          <Link href="/reservation/reservationform">Book Table</Link>
        </p>
        <p>
          Our friendly staff is always ready to assist you with your reservation
          and ensure you have a wonderful dining experience at DelightDine Hub
          Resto.
        </p>
      </div>
      <FooterNav />
    </>
  )
}

export default page
