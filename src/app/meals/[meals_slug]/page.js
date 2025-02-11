import FooterNav from "@/components/FooterNav"
import Header from "@/components/header"
import React from "react"

function page({ params }) {
  return (
    <div>
      <Header />
      <p>Dynamic page : {params.meals_slug}</p>
      <div className=" mt-40">
        <FooterNav />
      </div>
    </div>
  )
}

export default page
