'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(fromData){
    const meal = {
        title:fromData.get('title'),
        summary:fromData.get('summary'),
        instructions:fromData.get('instructions'),
        image:fromData.get('image'),
        creator:fromData.get('name'),
        creator_email:fromData.get('email')
    }
    await saveMeal(meal);
    redirect('/meals')
}