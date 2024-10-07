import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-9xl font-bold mb-4 glitch-text">404</h1>
      <p className="text-2xl mb-8 uppercase tracking-widest">Page Not Found</p>
      <div className="border-2 border-white p-4 hover:bg-white hover:text-black transition-colors">
        <Link href="/" className="text-xl uppercase tracking-wider">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
