import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-between">
          <p className="text-sm font-bold text-center">
            UK Student Loan Calculator
          </p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-lg font-bold uppercase border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-lg font-bold uppercase border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="text-xs mt-2 text-center">
          © {new Date().getFullYear()} UK Student Loan Calculator |{" "}
          <a
            href="https://twitter.com/hczdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Made by hczdev
          </a>
        </p>
      </div>
    </footer>
  );
}
