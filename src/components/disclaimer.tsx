import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-4 bg-[rgba(0,0,255,0.3)] border-4 border-black font-mono text-sm",
        className
      )}
    >
      <p className="font-bold uppercase mb-2">WARNING: NOT FINANCIAL ADVICE</p>
      <ul className="list-disc list-inside">
        <li>This tool is for rough estimates only.</li>
        <li>Do your own research. Check gov.uk for official info.</li>
        <li>Assumptions may be wrong or outdated.</li>
        <li>
          More info:{" "}
          <a
            href="https://www.gov.uk/repaying-your-student-loan"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.gov.uk/repaying-your-student-loan
          </a>
        </li>
      </ul>
    </div>
  );
}
