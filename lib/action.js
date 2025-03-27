"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}
export async function shareMeal(prevState, fromData) {
  const meal = {
    title: fromData.get("title"),
    summary: fromData.get("summary"),
    instructions: fromData.get("instructions"),
    image: fromData.get("image"),
    creator: fromData.get("name"),
    creator_email: fromData.get("email"),
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
        message: 'Invalid input.'
    }
  }
  await saveMeal(meal);
  revalidatePath('/meals');
  redirect("/meals");
}
