import React, { useEffect } from 'react'
import {useItemContext} from '../Item/context/ItemContext'

export const CategoryList = () => {
  const {getCategories, categories} = useItemContext()

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Value</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr>
            <td>{category.catalogItemId}</td>
            <td>{category.value}</td>
            <td>{category.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}