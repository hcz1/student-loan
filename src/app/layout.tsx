import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/header";

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
      </body>
    </html>
  );
}
