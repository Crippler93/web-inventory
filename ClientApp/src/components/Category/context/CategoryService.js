import React from 'react'

export const withServices = C => props => {
  const fetchCategories = async () => {
    const params = new URLSearchParams({
      name: 'all'
    })
    const result = await fetch(`inventory/categories?${params}`);
    const data = await result.json()
    return {result, data}
  }

  const fetchCategoryById = async (id) => {
    const result = await fetch(`inventory/categories/${id}`)
    const data = await result.json()
    return {result, data}
  }
  return (
    <C fetchCategories={fetchCategories} fetchCategoryById={fetchCategoryById} {...props}></C>
  )
}