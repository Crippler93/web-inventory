import React, { createContext, useContext, useState } from 'react'

import {withServices} from './CategoryService'

const Context = createContext({})

export const useCategoryContext = () => {
  return useContext(Context)
}


const Provider = ({children, fetchCategories}) => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    const {data} = await fetchCategories()
    setCategories(data)
  }

  return (
    <Context.Provider value={{
      categories,
      getCategories
    }}>
      {children}
    </Context.Provider>
  )
}

export const CategoryContext = withServices(Provider)

