"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsletterSignupButton } from "./newsletter-signup";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMortgage = pathname === "/mortgage";
  const isAbout = pathname === "/about";
  const isPrivacy = pathname === "/privacy";
  const isTerms = pathname === "/terms";
  const title = isHome
    ? "UK Student Loan Calculator"
    : isMortgage
    ? "Mortgage Calculator"
    : isAbout
    ? "About"
    : isPrivacy
    ? "Privacy Policy"
    : isTerms
    ? "Terms of Use"
    : "UK Student Loan Calculator";
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b-4 border-black">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold uppercase"
          >
            <Image
              src="/logo.png"
              alt="UK Student Loan Calculator"
              width={40}
              height={40}
              className="sm:w-[50px] sm:h-[50px]"
            />
            <span className="hidden sm:inline">{title}</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-4">
            <NavItem href="/" text="Home" />
            <NavItem href="/about" text="About" />
            <NavItem href="/mortgage" text="Mortgage" />
            <li>
              <NewsletterSignupButton />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <NavItem href="/" text="Home" onClick={toggleMenu} />
              <NavItem href="/about" text="About" onClick={toggleMenu} />
              <NavItem href="/mortgage" text="Mortgage" onClick={toggleMenu} />
              <li>
                <NewsletterSignupButton />
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

interface NavItemProps {
  href: string;
  text: string;
  onClick?: () => void;
}

function NavItem({ href, text, onClick }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-lg font-bold uppercase border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  );
}
