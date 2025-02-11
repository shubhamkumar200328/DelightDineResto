import React from "react"
import Header from "@/components/header"
import classes from "@/app/yourprofile/page.module.css"
import FooterNav from "@/components/FooterNav"

function page() {
  return (
    <>
      <Header />
      <div className={classes.Cdiv}>
        <h1>Your Profile page....</h1>
        <h2>Hi</h2>
      </div>
      <div className=" mt-40">
        <FooterNav />
      </div>
    </>
  )
}

export default page
