import React from 'react'

import { useItemContext } from './context/ItemContext'

export const ItemForm = ({onSubmit, buttonLabel="Create", categories=[]}) => {

  const {updateForm, item} = useItemContext()

  return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" value={item.name} name="name" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input className="form-control" type="number" value={item.quantity} name="quantity" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select className="form-control" value={item.catalogItemId} name="catalogItemId" onChange={updateForm}>
            <option value="">Select a category</option>
            {
              categories.map(category => (
                <option value={category.catalogItemId} title={category.description}>{category.value}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">{buttonLabel}</button>
        </div>
      </form>
  )
}
