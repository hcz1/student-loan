"use client";
// Add these imports
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function NewsletterSignupButton() {
  const { toast } = useToast();

  const handleSignup = () => {
    toast({
      title: "Newsletter Signup",
      description: "Enter your email to sign up for our newsletter",

      action: (
        <form
          className="flex items-center w-80"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email"
            className="mr-2 p-2 border-2 border-black rounded"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      ),
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
