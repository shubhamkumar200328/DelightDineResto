import React from "react"
import classes from "@/app/reservation/page.module.css"

function page({ params }) {
  return (
    <div className={classes.dynaminFrom}>
      <h1>Booking Section: {params.reservationform}</h1>
    </div>
  )
}

export default page
