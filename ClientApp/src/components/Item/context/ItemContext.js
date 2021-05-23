import React, { createContext, useContext, useState } from "react";
import { withFetch } from "./ItemService";

const ItemContext = createContext({});

export const useItemContext = () => {
  return useContext(ItemContext);
};

const ItemProvider = ({ children, fetchItems, fetchItemById, fetchCategories, postItemRequest, updateItemRequest }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    name: '',
    quantity: '1'    
  });
  const [itemId, setItemId] = useState("");
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    const {data} = await fetchItems()
    setItems(
      data.map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
      }))
    );
    setLoading(false);
  };

  const getCategories = async () => {
    const {data} = await fetchCategories()
    setCategories(data)
  }

  const getItemById = async id => {
    setLoading(true)
    try {
      const {data} = await fetchItemById(id)
      setItem({...data, createdAt: formatDate(data.createdAt)})
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
    setItem({...item, [name]: value})
  };

  const createItem = async (event) => {
    event.preventDefault();
    try {
      const {result, data} = await postItemRequest(item)
      if (result.status !== 200) {
        const errors = Object.entries(data.errors).map(error => {
          const [name, errors] = error
          return {name, errors}
        })
        setErrors(errors)
        return
      }
      setErrors([])
      resetItem()
      return data
    } catch (error) {
      setErrors([error.message])
    }
  };

  const updateItem = async event => {
    event.preventDefault();
    try {
      const {result, data} = await updateItemRequest(itemId, item)
      if (result.status !== 200) {
        const errors = Object.entries(data.errors).map(error => {
          const [name, errors] = error
          return {name, errors}
        })
        setErrors(errors)
        return
      }
      setErrors([])
      resetItem()
      setItemId("")
      return data
    } catch (error) {
      setErrors([error.message])
    }
  }

  const resetItem = () => {
    setItem({
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
          errors,
          categories,
          getItems,
          getItemById,
          updateForm,
          createItem,
          updateItem,
          resetItem,
          getCategories,
        }}
      >
        {children}
      </ItemContext.Provider>
  );
};

export default withFetch(ItemProvider);