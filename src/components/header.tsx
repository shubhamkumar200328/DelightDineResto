'use client';
import React from 'react';
import Link from 'next/link';
import logoImg from '@/assets/logo_1.jpg';
import Image from 'next/image';
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

function Header() {
  return (
    <>
      <div className="CHeader flex justify-between">
        <div className="Clogo flex-shrink-0">
          <p>
            <Image
              src={logoImg}
              alt="Logo for restaurant"
              className="ClogoImg"
              priority
            />
          </p>
          <Link href="/" className=" mt-4 ml-1 font-bold font-mono">
            DDH-Resto
          </Link>
        </div>

        <div className="Cul ">
          <SignedOut>
            <Link href="/meals" className="Cli justify-center text-center">
              Explore Meals
            </Link>
            <Link href="/community" className="Cli">
              Foodies Community
            </Link>
            <Link href="/about" className="Cli">
              About
            </Link>
            <SignInButton mode="modal">
              <button className="mr-4 mb-1">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="mb-1 mr-2">Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/menu" className="Cli">
              Explore Meals
            </Link>
            <Link href="/community" className="Cli">
              Foodies Community
            </Link>
            <Link href="/reservation" className="Cli">
              Reserve YourTable
            </Link>

            <Link href="/user-profile" className="Cli ">
              Profile
            </Link>
            <SignOutButton>
              <button className="mb-1 mr-2">Sign Out</button>
            </SignOutButton>
            {/* <UserButton afterSignOutUrl="/" /> */}
          </SignedIn>
        </div>
      </div>
      {/* <hr /> */}
    </>
  );
}

export default Header;
