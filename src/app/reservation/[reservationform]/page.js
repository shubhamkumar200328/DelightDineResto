// app/reservation/[reservationform]/page.js
'use client';
import React from "react";
import classes from "@/app/reservation/page.module.css";
import FooterNav from "@/components/FooterNav";
import Header from "@/components/header";
import { ToastContainer, toast } from "react-toastify"


const notify = () => toast("Your table Reserved successfully!");

function ReservationPage({ params }) {
  return (
    <>
      <Header />
      <div className={classes.container}>
      <h1 className={classes.title}>Table Reservation - {params.reservationform}</h1>
      <div className={classes.form}>
        <div className={classes.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required placeholder="Enter your full name" />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required placeholder="Enter your email" />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number" />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="date">Reservation Date</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="time">Reservation Time</label>
          <input type="time" id="time" name="time" required />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="guests">Number of Guests</label>
          <input type="number" id="guests" name="guests" min="1" max="20" required placeholder="e.g., 2" />
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="requests">Special Requests</label>
          <textarea id="requests" name="requests" rows="4" placeholder="Add any notes or special requests here..." />
        </div>

        <button type="submit" className={classes.submitBtn} onClick={notify}>Book Table</button>
      </div>
    </div>
    <div className="mt-40">
        <FooterNav />
    </div>
    <ToastContainer />
    </>
  );
}

export default ReservationPage;
