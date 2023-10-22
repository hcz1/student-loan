"use client";
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {!!window && window.document.location.hostname !== "localhost" && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-6J9K1SEEFM" />
          {/* <!-- Google tag (gtag.js) --> */}
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-6J9K1SEEFM');
        `}
          </Script>
          <Analytics />
        </>
      )}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
