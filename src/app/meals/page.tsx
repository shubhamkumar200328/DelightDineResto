import React from "react"
import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import FooterNav from "@/components/FooterNav"
import styles from "@/app/meals/page.module.css"
import CheeseBurger from "@/assets/CheeseBurger_11.jpg"
import hot_dog_1 from "@/assets/hot_dog_1.jpg"
import frenchFries from "@/assets/frenchFries.jpg"
import Litti_2 from "@/assets/Litti_2.jpg"
import donuts_1 from "@/assets/donuts_1.jpg"
import ChickenRosted from "@/assets/ChickenRosted.jpg"
import ice_cream_1 from "@/assets/ice_cream_1.jpg"
import momos_1 from "@/assets/momos_1.jpg"

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
      <div className="CblogDiv1 mx-40 mt-5">
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image
              src={CheeseBurger}
              alt="Cheese Burger"
              className="foodImg"
              priority
            />
          </p>
          <h2 className=" text-xl my-4">Cheese Burger</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image src={hot_dog_1} alt="hot dog" className="foodImg" priority />
          </p>
          <h2 className=" text-xl my-4">hot dog</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image
              src={frenchFries}
              alt="French Fries"
              className="foodImg"
              priority
            />
          </p>
          <h2 className=" text-xl my-4">French Fries</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image
              src={Litti_2}
              alt="Litti Chokha"
              className="foodImg"
              priority
            />
          </p>
          <h2 className=" text-xl my-4">Litti Chokha</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>

        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image src={donuts_1} alt="Donuts" className="foodImg" priority />
          </p>
          <h2 className=" text-xl my-4">Donuts</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image
              src={ChickenRosted}
              alt="Chicken Rosted"
              className="foodImg"
              priority
            />
          </p>
          <h2 className=" text-xl my-4">Chicken Rosted</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image
              src={ice_cream_1}
              alt="ice_Cream"
              className="foodImg"
              priority
            />
          </p>
          <h2 className=" text-xl my-4">ice_Cream</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
        <div className="CblogPostDiv">
          <p className="Ccircle">
            <Image src={momos_1} alt="momos" className="foodImg" priority />
          </p>
          <h2 className=" text-xl my-4">momos</h2>
          <p className={styles.ordernow}>
            <Link href="/meals/Meals_Ordering_Page............">
              Order now →
            </Link>
          </p>
          <p className=" mt-7">
            <Link
              href="/meals/Meals_details_will_appear_here................"
              className=" text-blue-400"
            >
              read more
            </Link>
          </p>
        </div>
      </div>

      <div className=" mt-40">
        <FooterNav />
      </div>
    </div>
  )
}

export default page
