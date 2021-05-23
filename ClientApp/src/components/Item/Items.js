import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useItemContext } from "./context/ItemContext";

export const Items = () => {

  const { items, getItems, loading } = useItemContext()

  useEffect(() => {
    getItems();
  }, []);

  const renderTable = () => (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Created At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.itemId} >
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.createdAt}</td>
            <td><Link to={`items/${item.itemId}`}>details</Link></td>
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

      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..."/>
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">11 mins ago</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>
    
  );
};
