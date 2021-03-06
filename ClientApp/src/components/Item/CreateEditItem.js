import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useItemContext } from './context/ItemContext'
import { ItemForm } from './ItemForm'

export const CreateEditItem = () => {

  const { errors, categories, getCategories, updateItem, getItemById, createItem, resetItem} = useItemContext()
  const history = useHistory()
  const {id} = useParams()

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    id ?
      getItemById(id):
      resetItem()
    
  }, [id])
  
  const handleSubmit = async event => {
    try {
      if (id) {
        const item = await updateItem(event)
        if (item.itemId) {
          history.push(`/items/${item.itemId}`)
        }
      } else {
        const itemId = await createItem(event)
        if (itemId) {
          history.push('items')
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{id ? "Edit item:" : "Create new item:"}</h1>
      {id && (<Link to={`/items/${id}`}>Go Back</Link>)}
      {
        !!errors.length && (
          <div className="alert alert-danger" role="alert">
            {errors.map(({name, errors:moreErrors}, i) => (
              <div key={i}>
                {`${name}:`}
                <ul>
                {moreErrors.map((message, i2) => (
                  <li key={i2}>
                    {message}
                  </li>
                ))}
                </ul>
              </div>)
            )}
          </div>
        )
      }
      <ItemForm categories={categories} onSubmit={handleSubmit} buttonLabel={id ? "Edit" : "Create"}></ItemForm>
    </div>
  )
}