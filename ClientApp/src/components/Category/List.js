import React, { useEffect } from 'react'

import { Table } from '../Table'
import {useCategoryContext} from './context/CategoryContext'

export const CategoryList = () => {
  const {getCategories, categories} = useCategoryContext()

  useEffect(() => {
    getCategories()
  }, [])

  const renderTable = () => {
    const tableProps = {
      columns: ['#', 'Catalog Code', 'Value', 'Description'],
      idKey: 'catalogItemId',
      row: ['catalogItemId', 'catalogCode', 'value', 'description'],
      actions: [
        {
          url: 'category',
          needId: true,
          linkName: 'Details'
        }
      ],
      items: categories
    }
    return <Table {...tableProps}/>
  };

  return (
    <div>
      <h1>Categories</h1>
      {renderTable()}
    </div>
  )
}