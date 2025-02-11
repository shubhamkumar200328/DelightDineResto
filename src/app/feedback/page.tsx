import React from "react"
import Header from "@/components/header"
import FooterNav from "@/components/FooterNav"

function page() {
  return (
    <div>
      <Header />
      <p className=" text-center text-2xl mb-4 mt-4">
        Give Feedback and Earn Cashback!
      </p>
      <div className=" ml-40 mt-7">
        <p>Provide your Honest Feedback about your order</p>
        <ol>
          <li>To avail the cashback : Give Feedback within 48 hrs</li>
          <li>Food Order id</li>
          <li>Date of Order</li>
          <li>Rating</li>
          <li>Suggestion</li>
          <li>Flat Rs5 Cashback or up to 10 Coins</li>
          <li>Greeting</li>
        </ol>
        <br />
        <ol>
          <li>To avail the cashback : Give Feedback within 48 hrs</li>
          <li>Food Order id</li>
          <li>Date of Order</li>
          <li>Rating</li>
          <li>Suggestion</li>
          <li>Flat Rs5 Cashback or up to 10 Coins</li>
          <li>Greeting</li>
        </ol>

        <div className=" mt-40">
          <FooterNav />
        </div>
      </div>
    </div>
  )
}

export default page
