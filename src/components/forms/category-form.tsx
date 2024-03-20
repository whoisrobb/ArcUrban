"use client";

import React from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { categorySchema } from '@/lib/validators/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { addCategory } from '@/lib/actions/navigation';

type inputType = z.infer<typeof categorySchema>

const CategoryForm = () => {
    const form = useForm<inputType>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: ''
        }
    })

    const onSubmit = async (values: inputType) => {
        await addCategory(values)
        console.log(values)
    }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category title</FormLabel>
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CategoryForm