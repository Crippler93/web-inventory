import React, { createContext, useContext, useState } from "react";

const ItemContext = createContext({});

export const useItemContext = () => {
  return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [quantity, setQuantity] = useState("1");
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

  const formatDate = (string) => {
    const date = new Date(string);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      default:
        break;
    }
  };

  const createItem = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity }),
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
      setName("");
      setErrors([])
      setQuantity("1");

      return data
    } catch (error) {
      setErrors([error.message])
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        loading,
        fetchItems,
        name,
        quantity,
        errors,
        updateForm,
        createItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
