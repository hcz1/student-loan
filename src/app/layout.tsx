import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://loantype.co.uk"),
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
    site: "@student.loantype.co.uk",
  },
  openGraph: {
    title: "UK Student Loan Calculator | Calculate Your Repayments Easily",
    description:
      "Estimate your UK student loan repayments effortlessly with our user-friendly Student Loan Calculator. Plan your financial future and stay informed about your repayment obligations. Take control of your student debt today!",
    type: "website",
    url: "https://student.loantype.co.uk",
    siteName: "Student Loan Calculator",
    images: [
      {
        url: "https://student.loantype.co.uk/images/og-image.png",
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
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
