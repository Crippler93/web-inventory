import React from 'react'

import { useItemContext } from '../context/ItemContext'

export const ItemForm = ({onSubmit, buttonLabel="Create"}) => {

  const {updateForm, itemForm} = useItemContext()

  return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" value={itemForm.name} name="name" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input className="form-control" type="number" value={itemForm.quantity} name="quantity" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">{buttonLabel}</button>
        </div>
      </form>
  )
}
