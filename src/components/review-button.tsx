"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { addReview } from "@/actions/email";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";

const ReviewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(addReview, {
    success: false,
    errors: {},
  });
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-16 h-16 bg-[rgba(178,178,252,1)] text-black text-2xl font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
        aria-label="Leave a review"
      >
        ★
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0">
          <DialogHeader className="p-4 bg-[rgba(178,178,252,1)] border-b-4 border-black">
            <DialogTitle className="text-2xl font-bold">
              Leave a Review
            </DialogTitle>
            <DialogDescription className="text-black font-medium mt-2">
              We&apos;d love to hear your feedback! Please leave a review for
              our UK Student Loan Repayment Calculator.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <form action={formAction} className="flex flex-col gap-4">
              {state.success ? (
                <div className="bg-[rgba(178,178,252,1)] text-black p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                  Review submitted successfully!
                </div>
              ) : (
                <>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border-2 border-black p-2"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border-2 border-black p-2"
                    required
                  />
                  <Textarea
                    name="feedback"
                    placeholder="Review"
                    className="w-full border-2 border-black p-2"
                    required
                  />
                  <FormButton />
                </>
              )}
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? <Loader2 className="mr-2" /> : <Send className="mr-2" />}
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};
export default ReviewButton;
