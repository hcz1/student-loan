import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/header";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import { ConsentBanner } from "@/components/consent-banner";
import { Toaster } from "@/components/ui/toaster";
import ReviewButton from "@/components/review-button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "UK Student Loan Repayment Calculator",
  description:
    "Calculate your student loan repayments based on your salary with our easy-to-use UK student finance calculator. Covers Plan 1, 2, 4, 5 and postgraduate loans.",
  keywords: [
    "student loan calculator",
    "UK student loan",
    "student debt calculator uk",
    "repayment calculator",
    "student finance",
    "loan repayment",
    "salary-based calculator",
    "student loan interest",
    "student loan calculator uk",
    "student loan payment calculator",
    "student loan repayment calculator",
    "loan repayment calculator uk",
    "student loan repayment calculator based on salary",
    "student finance repayment calculator",
    "student loan overpayment calculator",
    "student loan monthly repayment calculator",
  ],
  applicationName: "UK Student Loan Repayment Calculator",
  category: "finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow flex flex-col mt-16">
          <div className="container mx-auto flex-grow flex flex-col justify-center">
            {children}
          </div>
        </main>
        <Footer />
        <ConsentBanner />
        <GoogleAnalytics gaId="G-GRS5LFFVXS" />
        <Toaster />
        <ReviewButton /> {/* Add this line */}
      </body>
    </html>
  );
}
