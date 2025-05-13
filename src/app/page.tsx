// src/app/page.tsx

import Head from "next/head"
import HomePage from "./Home/homepage"

export default function Home() {
  return (
    <>
      <Head>
        <title>RODRIGUEZ - Blog</title> {/* Title for the home page */}
      </Head>
      <HomePage />
    </>
  )
}
