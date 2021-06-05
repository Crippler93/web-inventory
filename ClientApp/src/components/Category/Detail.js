import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {useCategoryContext} from './context/CategoryContext'

export const CategoryDetail = () => {
  const {getCategoryById, category, loading} = useCategoryContext()
  const {id} = useParams()

  useEffect(() => {
    getCategoryById(id)
  }, [id])

  return (
    <div>
      <h2>Category details:</h2>
      <Link to="/category">Go Back</Link>
      {
        (loading) ? <p>Loading info from server...</p> : (
          <div>
            <span><b>Name:</b> {category.value}</span>
            <br/>
            <span><b>Description:</b> {category.description}</span>
            <br/>
            <span><b>Catalog code:</b> {category.catalogCode}</span>
            <br/>
          </div>
        )
      }
    </div>
  )
}