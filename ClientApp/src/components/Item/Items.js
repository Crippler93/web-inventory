import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../Table";

import { useItemContext } from "./context/ItemContext";

export const Items = () => {

  const { items, getItems, loading } = useItemContext()

  useEffect(() => {
    getItems()
  }, []);

  const renderTable = () => {
    const tableProps = {
      columns: ['Name', 'Quantity', 'Created At'],
      idKey: 'itemId',
      row: ['name', 'quantity', 'createdAt'],
      actions: [
        {
          url: `items`,
          linkName: 'Details',
          needId: true,
        },
        {
          url: `add-entry`,
          linkName: 'Add entry',
          needId: true
        }
      ],
      items: items
    }
    return <Table {...tableProps}/>
  };

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
      <Link className="me-3" to="create-item">Create item</Link>
    </div>
    
  );
};

