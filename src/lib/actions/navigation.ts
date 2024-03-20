"use server";

import db from "@/db/drizzle";
import { categories, subcategories, NewCategory } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const getCategories = async () => {
    const data = await db.select({ categories, subcategories }).from(categories).leftJoin(subcategories, eq(categories.id, subcategories.categoryId))
    return data;
}

export const addCategory = async (input: NewCategory) => {
    try {
        console.log('start')
        const productsWithSameName = await db.select().from(categories).where(eq(categories.title, input.title));

        if (productsWithSameName.length > 0) {
            throw new Error('Category already exists')
        }

        await db.insert(categories).values({ ...input });

        revalidatePath('/dashboard');
    } catch (err) {
        return {
            data: null,
            error: 'Something went wrong'
        }
    }
};