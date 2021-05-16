import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useItemContext } from "../context/ItemContext";

export const Items = () => {

  const { items, fetchItems, loading } = useItemContext()

  useEffect(() => {
    fetchItems();
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
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
      <Link to="create-item">Create item</Link>
    </div>
  );
};
