import React, { createContext, useContext, useState } from "react";

const ItemContext = createContext({});

export const useItemContext = () => {
  return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemForm, setItemForm] = useState({
    name: '',
    quantity: '1'
  })
  const [itemId, setItemId] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const response = await fetch("inventory");
    const data = await response.json();
    setItems(
      data.map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
      }))
    );
    setLoading(false);
  };

  const fetchItemById = async id => {
    setLoading(true)
    try {
      const response = await fetch("inventory/" + id)
      const data = await response.json()
      setItem({...data, createdAt: formatDate(data.createdAt)})
      setItemId(data.itemId)
    } catch (error) {
      setErrors([error])
    } finally {
      setLoading(false)
    }
  }

  const fetchItemFormById = async id => {
    setLoading(true)
    try {
      const response = await fetch("inventory/" + id)
      const data = await response.json()
      setItemForm({ name: data.name, quantity: data.quantity })
      setItemId(data.itemId)
    } catch (error) {
      setErrors([error])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (string) => {
    const date = new Date(string);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    setItemForm({...itemForm, [name]: value})
  };

  const createItem = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemForm),
    };
    try {
      const result = await fetch("inventory", requestOptions);
      if (result.status !== 200) {
        const data = await result.json()
        const errors = Object.entries(data.errors).map(error => {
          const [name, errors] = error
          return {name, errors}
        })
        setErrors(errors)
        return
      }
      const data = await result.json();
      setErrors([])
      resetItem()
      return data
    } catch (error) {
      setErrors([error.message])
    }
  };

  const updateItem = async event => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemForm),
    };
    try {
      const result = await fetch(`inventory/${itemId}`, requestOptions);
      if (result.status !== 200) {
        const data = await result.json()
        const errors = Object.entries(data.errors).map(error => {
          const [name, errors] = error
          return {name, errors}
        })
        setErrors(errors)
        return
      }
      const data = await result.json();
      setErrors([])
      resetItem()
      setItemId("")
      return data
    } catch (error) {
      setErrors([error.message])
    }
  }

  const resetItem = () => {
    setItemForm({
      name: '',
      quantity: '1'
    })
  }

  return (
    <ItemContext.Provider
      value={{
        items,
        item,
        loading,
        itemForm,
        errors,
        fetchItems,
        fetchItemById,
        updateForm,
        createItem,
        updateItem,
        fetchItemFormById,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
