import FooterNav from "@/components/FooterNav"
import Header from "@/components/header"
import React from "react"

function page() {
  return (
    <div>
      <Header />
      <div className="shareDiv">
        <h1>Share meals</h1>
      </div>
      <div className=" mt-40">
        <FooterNav />
      </div>
    </div>
  )
}

export default page
