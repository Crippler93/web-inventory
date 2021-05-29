import React, { useEffect } from 'react'
import {useCategoryContext} from './context/CategoryContext'

export const CategoryList = () => {
  const {getCategories, categories} = useCategoryContext()

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Catalog Code</th>
          <th scope="col">Value</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr>
            <td>{category.catalogItemId}</td>
            <td>{category.catalogCode}</td>
            <td>{category.value}</td>
            <td>{category.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}