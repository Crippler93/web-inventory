import React from "react";

export const withFetch = (C) => (props) => {
  const fetchItems = async () => {
    const result = await fetch("inventory");
    const data = await result.json();
    return {result, data}
  };

  const fetchItemById = async id => {
    const result = await fetch("inventory/" + id)
    const data = await result.json()
    return {result, data}
  }

  const postItemRequest = async (item) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    const result = await fetch("inventory", requestOptions);
    const data = await result.json()
    return {result, data}
  };

  const updateItem = async (itemId, item) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    const result = await fetch(`inventory/${itemId}`, requestOptions);
    const data = await result.json()
    return {result, data}
  }

  const fetchCategories = async () => {
    const result = await fetch(`inventory/categories`);
    const data = await result.json()
    return {result, data}
  }

  return (
    <C updateItemRequest={updateItem}
    postItemRequest={postItemRequest}
    fetchItems={fetchItems}
    fetchItemById={fetchItemById}
    fetchCategories={fetchCategories}
    {...props}>
    </C>
  );
};
