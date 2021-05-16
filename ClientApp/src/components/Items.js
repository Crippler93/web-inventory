import React, { useEffect, useState } from "react";

export const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateItems();
  }, []);

  const renderTable = () => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.itemId}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{formatDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const populateItems = async () => {
    const response = await fetch("inventory");
    const data = await response.json();
    setItems(data);
    setLoading(false);
  };

  const formatDate = string => {
    const date = new Date(string)
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  return (
    <div>
      <h1 id="tabelLabel">List of Items</h1>
      {loading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        renderTable()
      )}
    </div>
  );
};
