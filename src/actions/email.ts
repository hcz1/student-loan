"use server";
import { z } from "zod";

import Airtable from "airtable";
Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN_KEY,
});
const base = Airtable.base("appI77Z7ZcwEUvAoU");
const table = base("Emails");
const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export async function addEmail(prevState: any, formData: FormData) {
  console.log("here");
  console.log(formData);
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  try {
    const records = await table.create({
      Email: validatedFields.data.email,
    });
    if (records.id) {
      return { success: true };
    } else {
      return { errors: { email: "Failed to add email" }, success: false };
    }
  } catch (e) {
    console.log(e);
    return { errors: { email: "Failed to add email" }, success: false };
  }
}
