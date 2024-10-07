import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b-4 border-black">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold uppercase"
          >
            <Image
              src="/logo.png"
              alt="UK Student Loan Calculator"
              width={50}
              height={50}
            />
            <span>UK Student Loan Calculator</span>
          </Link>
          <ul className="flex space-x-4">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
