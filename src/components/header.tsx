import React from "react"
import Link from "next/link"
import logoImg from "@/assets/logo_1.jpg"
import Image from "next/image"
import Navlink from "./Nav-link"

function Header() {
  return (
    <>
      <div className="CHeader">
        <div className="Clogo">
          <p>
            <Image
              src={logoImg}
              alt="Logo for restaurant"
              className="ClogoImg"
              priority
            />
          </p>
          <p className=" mt-4 ml-3 font-bold font-mono">
            DelightDine Hub Resto
          </p>
        </div>
        <div>
          <ul className="Cul">
            <li className="Cli">
              <Navlink href="/meals">Explore Meals</Navlink>
            </li>
            <li className="Cli">
              <Navlink href="/community">Foodies Community</Navlink>
            </li>
            <li className="Cli">
              <Navlink href="/reservation">Reserve YourTable</Navlink>
            </li>
            <li className="Cli">
              <Navlink href="/yourprofile">Signup/login</Navlink>
            </li>
          </ul>
        </div>
      </div>
      {/* <hr /> */}
    </>
  )
}

export default Header
