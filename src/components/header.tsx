import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-black py-4 bg-white z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          {/* Placeholder logo */}
          <div className="w-10 h-10 bg-black mr-4"></div>
          <Link href="/" className="text-2xl font-bold">
            UK Student Loan Calculator
          </Link>
        </div>
        <nav>
          <Link href="/about" className="text-lg font-medium hover:underline">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
