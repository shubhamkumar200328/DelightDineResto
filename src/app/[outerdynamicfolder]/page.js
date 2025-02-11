import FooterNav from "@/components/FooterNav"
import Header from "@/components/header"
import React from "react"
import classes from "@/app/[outerdynamicfolder]/outerdynaicfolder.module.css"

function page({ params }) {
  return (
    <>
      <Header />
      <div className={classes.OuterDyFolderDiv}>
        <p>Dynamic page : {params.outerdynamicfolder}</p>
      </div>
      <div className=" mt-60">
        <FooterNav />
      </div>
    </>
  )
}

export default page
