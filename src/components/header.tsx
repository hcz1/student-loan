import Image from "next/image";
import Link from "next/link";
import { NewsletterSignupButton } from "./newsletter-signup";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b-4 border-black">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-2 md:py-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold uppercase mb-2 md:mb-0"
          >
            <Image
              src="/logo.png"
              alt="UK Student Loan Calculator"
              width={40}
              height={40}
              className="sm:w-[50px] sm:h-[50px]"
            />
            <span className="text-center md:text-left ">
              UK Student Loan Calculator
            </span>
          </Link>
          <ul className="flex items-center space-x-2 sm:space-x-4">
            <li>
              <Link
                href="/"
                className="text-lg font-bold uppercase border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-lg font-bold uppercase border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <NewsletterSignupButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
