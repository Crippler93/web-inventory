import React from 'react'
import { useHistory } from 'react-router-dom'
import { useItemContext } from '../context/ItemContext'

export const CreateItem = () => {

  const {name, quantity, errors, updateForm, createItem} = useItemContext()
  const history = useHistory()
  
  const handleSubmit = async event => {
    const id = await createItem(event)
    if (id) {
      history.push('items')
    }
  }

  return (
    <div>
      <h1>Create new item</h1>
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
      <form onSubmit={handleSubmit}>
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