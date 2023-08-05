import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UK Student Loan Calculator | Calculate Your Repayments Easily",
  description:
    "Estimate your UK student loan repayments effortlessly with our user-friendly Student Loan Calculator. Plan your financial future and stay informed about your repayment obligations. Take control of your student debt today!",
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "Student Loan Calculator",
  },
  applicationName: "Student Loan Calculator",
  category: "finance",
  keywords: ["student loan", "calculator", "student loan calculator"],
  twitter: {
    card: "summary_large_image",
    site: "@studentloan-calculator.com",
  },
  openGraph: {
    title: "UK Student Loan Calculator | Calculate Your Repayments Easily",
    description:
      "Estimate your UK student loan repayments effortlessly with our user-friendly Student Loan Calculator. Plan your financial future and stay informed about your repayment obligations. Take control of your student debt today!",
    type: "website",
    url: "https://studentloan-calculator.com",
    siteName: "Student Loan Calculator",
    images: [
      {
        url: "https://studentloan-calculator.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Student Loan Calculator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
