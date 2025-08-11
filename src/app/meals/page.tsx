import React from "react";
import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import FooterNav from "@/components/FooterNav";
import styles from "./page.module.css";
import CheeseBurger from "@/assets/CheeseBurger_11.jpg";
import hot_dog_1 from "@/assets/hot_dog_1.jpg";
import frenchFries from "@/assets/frenchFries.jpg";
import Litti_2 from "@/assets/Litti_2.jpg";
import donuts_1 from "@/assets/donuts_1.jpg";
import ChickenRosted from "@/assets/ChickenRosted.jpg";
import ice_cream_1 from "@/assets/ice_cream_1.jpg";
import momos_1 from "@/assets/momos_1.jpg";

const meals = [
  { name: "Cheese Burger", price: "15", image: CheeseBurger, alt: "Cheese Burger" },
  { name: "Hot Dog", price: "15", image: hot_dog_1, alt: "hot dog" },
  { name: "French Fries", price: "11", image: frenchFries, alt: "French Fries" },
  { name: "Litti Chokha", price: "14", image: Litti_2, alt: "Litti Chokha" },
  { name: "Donuts", price: "8", image: donuts_1, alt: "Donuts" },
  { name: "Chicken Rosted", price: "50", image: ChickenRosted, alt: "Chicken Rosted" },
  { name: "ice_Cream", price: "10", image: ice_cream_1, alt: "ice_Cream" },
  { name: "Momos", price: "12.5", image: momos_1, alt: "momos" },
];

function page() {
  return (
    <div>
      <Header />
      <p className=" text-3xl text-center my-8">
        <span className=" mr-3">
          Forget not to Share Recipe with your favourite ones
        </span>
        <Link href="/meals/share_meals" className={styles.sharemeals}>
          Share meals →
        </Link>
      </p>
      <div className={styles.CblogDiv1}>
        {meals.map((meal, index) => (
          <div className={styles.CblogPostDiv} key={index}>
            <p className={styles.Ccircle}>
              <Image
                src={meal.image}
                alt={meal.alt}
                className={styles.foodImg}
                priority
              />
            </p>
            <div className={styles.foodDetails}>
              <h4 className=" text-xl">{meal.name}</h4>
              <p className="price">${meal.price}</p>
            </div>
            <p className={styles.ordernow}>
              <Link href={`/meals/order?name=${encodeURIComponent(meal.name)}&price=${meal.price}`}>
                Order now →
              </Link>
            </p>
          </div>
        ))}
      </div>
      <div className=" mt-40">
        <FooterNav />
      </div>
    </div>
  );
}

export default page;
