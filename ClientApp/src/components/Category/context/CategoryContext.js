import React, { createContext, useContext, useState } from 'react'

import {withServices} from './CategoryService'

const Context = createContext({})

export const useCategoryContext = () => {
  return useContext(Context)
}


const Provider = ({children, fetchCategories, fetchCategoryById}) => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCategories = async () => {
    const {data} = await fetchCategories()
    setCategories(data)
  }

  const getCategoryById = async (id) => {
    setLoading(true)
    try {
      const {data} = await fetchCategoryById(id)
      setCategory(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Context.Provider value={{
      categories,
      category,
      loading,
      getCategories,
      getCategoryById
    }}>
      {children}
    </Context.Provider>
  )
}

export const CategoryContext = withServices(Provider)

