import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useItemContext } from './context/ItemContext';

const addQuantity = C => props => {
  const updateQuantity = async (id, quantity) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({quantity}),
    };
    const result = await fetch(`inventory/entry/${id}`, requestOptions);
    const data = await result.json()
    return {result, data}
  }

  return <C updateQuantity={updateQuantity} {...props}></C>
}

const QuantityForm = ({updateQuantity}) => {
  const [formQuantity, setFormQuantity] = useState(1)
  const {item, getItemById, } = useItemContext()
  const {id} = useParams()

  useEffect(() => {
    getItemById(id)
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateQuantity(id, formQuantity)
    await getItemById(id)
  }

  const handleInput = event => {
    const {target: {value}} = event
    if (value >= 1 || value == '') {
      setFormQuantity(value)
    }
  }

  const handleKeyPress = event => {
    if (event.key == 'e' || event.key == '-') {
      event.preventDefault()
    }
  }

  return (
    <div className="py-3">
      <h2>Add entry</h2>
      <p>Current quantity: {item.quantity}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="label-form">Quantity:</label>
          <input className="form-control" type="number" value={formQuantity} onChange={handleInput} onKeyPress={handleKeyPress}></input>
        </div>
        <button type="submit" className="btn btn-primary">Add entry</button>
      </form>
    </div>
  )
}

export const AddQuantity = addQuantity(QuantityForm)