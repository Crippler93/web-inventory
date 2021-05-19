import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useItemContext } from '../context/ItemContext'

export const EditItem = () => {

  const {name, quantity, errors, updateForm, updateItem, fetchItemById} = useItemContext()
  const history = useHistory()
  const {id} = useParams()

  useEffect(() => {
    if (id) {
      fetchItemById(id)
    }
  }, [id])
  
  const handleSubmit = async event => {
    try {
      const item = await updateItem(event)
      if (item.itemId) {
        history.push(`/items/${item.itemId}`)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Edit item:</h1>
      <Link to={`/items/${id}`}>Go Back</Link>
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
          <button type="submit" className="btn btn-primary">Edit</button>
        </div>
      </form>
    </div>
  )
}