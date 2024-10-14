"use server";
import { z } from "zod";

import Airtable from "airtable";
Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN_KEY,
});
const base = Airtable.base("appI77Z7ZcwEUvAoU");
const table = base("Emails");
const reviewsTable = base("Reviews");
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

const reviewSchema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
  name: z.string({
    invalid_type_error: "Invalid Name",
  }),
  feedback: z.string({
    invalid_type_error: "Invalid feedback",
  }),
});
export async function addReview(prevState: any, formData: FormData) {
  const validatedFields = reviewSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    feedback: formData.get("feedback"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const records = await reviewsTable.create({
      Email: validatedFields.data.email,
      Name: validatedFields.data.name,
      Feedback: validatedFields.data.feedback,
    });
    if (records.id) {
      return { success: true };
    } else {
      return { errors: { email: "Failed to add review" }, success: false };
    }
  } catch (e) {
    console.log(e);
    return { errors: { email: "Failed to add review" }, success: false };
  }
}
