import React, {createContext, useContext, useState} from 'react'

const ItemContext = createContext({})

export const useItemContext = () => {
  return useContext(ItemContext)
}

export const ItemProvider = ({children}) => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const response = await fetch("inventory");
    const data = await response.json();
    setItems(data.map(item => ({
      ...item,
      createdAt: formatDate(item.createdAt)
    })));
    setLoading(false);
  };

  const formatDate = string => {
    const date = new Date(string)
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  return (
    <ItemContext.Provider value={{items, loading, fetchItems}}>
      {children}
    </ItemContext.Provider>
  )
}