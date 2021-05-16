import React from 'react'
import { useItemContext } from '../context/ItemContext'

export const CreateItem = () => {

  const {name, quantity, updateForm, createItem} = useItemContext()

  return (
    <div>
      <form onSubmit={createItem}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} name="name" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" value={quantity} name="quantity" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}