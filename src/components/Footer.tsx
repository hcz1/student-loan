import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-lg font-bold uppercase mb-4 md:mb-0">
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
        <div className="mt-4 text-center">
          <p className="text-sm mt-2">
            Made by{" "}
            <a
              href="https://twitter.com/hczdev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              hczdev
            </a>
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} UK Student Loan Calculator. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
