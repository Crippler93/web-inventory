import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useItemContext } from './context/ItemContext'

export const ItemDetail = () => {
  const {getItemById, item, loading} = useItemContext()
  const {id} = useParams()

  useEffect(() => {
    getItemById(id)
  }, [id])

  return (
    <div>
      <h2>Item details:</h2>
      <Link to="/items">Go Back</Link>
      {
        (loading) ? <p>Loading info from server...</p> : (
          <div>
            <span><b>Name:</b> {item.name}</span>
            <br/>
            <span><b>Created At:</b> {item.createdAt}</span>
            <br/>
            <span><b>Quantity:</b> {item.quantity}</span>
            <br/>
            <div>
              <b>Category:</b> 
              <dl className="ml-3 mt-2">
                <dt>Name</dt>
                <dd>{item?.catalogItem?.value}</dd>
                <dt>Decription</dt>
                <dd>{item?.catalogItem?.description}</dd>
              </dl>
            </div>
            <div className="d-flex flex-row-reverse">
              <Link to={`/items/edit/${item.itemId}`}>
                <button className="btn btn-sm btn-primary">Edit</button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}