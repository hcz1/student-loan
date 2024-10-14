"use client";
import { Input } from "./ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { addEmail } from "@/actions/email";
import { Button } from "./ui/button";

const initialState = {
  errors: {},
  success: false,
};

export function NewsletterForm() {
  const [state, formAction] = useFormState(addEmail, initialState);

  if (state.success) {
    return <p className="text-green-600">Thank you for subscribing!</p>;
  }

  return (
    <form action={formAction} className="flex items-center w-80">
      <Input
        type="email"
        name="email"
        placeholder="Your email"
        className="mr-2 p-2 border-2 border-black rounded"
      />
      <FormButton />
    </form>
  );
}

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
};
