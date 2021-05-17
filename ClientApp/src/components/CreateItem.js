import React from 'react'
import { useItemContext } from '../context/ItemContext'

export const CreateItem = () => {

  const {name, quantity, errors, updateForm, createItem} = useItemContext()

  return (
    <div>
      <h1>Create new item</h1>
      {
        !!errors.length && (
          <div className="alert alert-danger" role="alert">
            {errors.map(error => (<div>{error}</div>))}
          </div>
        )
      }
      <form onSubmit={createItem}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" value={name} name="name" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input className="form-control" type="number" value={quantity} name="quantity" onChange={updateForm}></input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  )
}