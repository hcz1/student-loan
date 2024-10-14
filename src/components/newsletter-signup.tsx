"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterSignupButton() {
  const { toast } = useToast();

  const handleSignup = () => {
    toast({
      title: "Newsletter Signup",
      description: "Enter your email to sign up for our newsletter",

      action: <NewsletterForm />,
    });
  };

  return (
    <Button
      className="text-lg font-bold uppercase border-2 border-black px-3 py-[0.05rem] hover:bg-black hover:text-white transition-colors rounded-none h-auto"
      onClick={handleSignup}
      variant="ghost"
    >
      Sign up
    </Button>
  );
}
