import CategoryForm from '@/components/forms/category-form'
import { getCategories } from '@/lib/actions/navigation'
import React from 'react'

const dashboard = async () => {
    const categories = await getCategories();
  return (
    <div>
        dashboard
        <CategoryForm />
        {categories.map((cat, index) => (
            <li key={index} className="">{cat.categories.title}</li>
        ))}
    </div>
  )
}

export default dashboard