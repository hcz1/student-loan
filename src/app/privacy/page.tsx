import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UK Student Loan Repayment Calculator",
  description:
    "Privacy Policy for the UK Student Loan Repayment Calculator. Learn about how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="m-4 mt-8 md:m-0 p-6 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,255,0.3)] flex-grow flex flex-col overflow-y-scroll max-h-[calc(100vh-20rem)]">
      <h1 className="text-4xl font-bold mb-6 uppercase">Privacy Policy</h1>
      <div className="space-y-4">
        <p>
          This Privacy Policy outlines how the UK Student Loan Repayment
          Calculator collects, uses, and protects your personal information.
        </p>
        <h2 className="text-2xl font-bold mt-6">1. Information Collection</h2>
        <p>
          We collect information you provide directly to us when using the
          calculator, such as loan details and salary information. This data is
          used solely for calculation purposes and is not stored on our servers.
        </p>
        <h2 className="text-2xl font-bold mt-6">2. Use of Cookies</h2>
        <p>
          We use cookies to enhance your experience on our website. Cookies are
          small text files stored on your device that help us analyze website
          traffic and customize content for you.
        </p>
        <h3 className="text-xl font-bold mt-4">Types of Cookies We Use:</h3>
        <ul className="list-disc pl-6">
          <li>
            Essential cookies: Required for the website to function properly.
          </li>
          <li>
            Analytics cookies: Help us understand how visitors interact with our
            website.
          </li>
          <li>Preference cookies: Remember your settings and preferences.</li>
        </ul>
        <p>
          By using our website, you consent to the use of cookies in accordance
          with this policy.
        </p>
        <h2 className="text-2xl font-bold mt-6">3. Google Analytics</h2>
        <p>
          We use Google Analytics to track and analyze website traffic. This
          service may use cookies to collect anonymous information about your
          visits to our site.
        </p>
        <h2 className="text-2xl font-bold mt-6">4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information. However, no method of transmission over the Internet is
          100% secure, and we cannot guarantee absolute security.
        </p>
        <h2 className="text-2xl font-bold mt-6">5. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these sites.
        </p>
        <h2 className="text-2xl font-bold mt-6">6. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </p>
        <h2 className="text-2xl font-bold mt-6">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at @hczdev.
        </p>
      </div>
    </div>
  );
}
