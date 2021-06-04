import React from 'react'
import { Link } from 'react-router-dom'

export const Table = ({row=[], items=[], columns=[], actions=[], idKey=""}) => {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          {columns.map(column => (<th>{column}</th>))}
          {actions.length > 0 && (<th>Actions</th>)}          
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={idKey} >
            {row.map(rowData => (<td>{item[rowData]}</td>))}
            { actions.length > 0 && (<td>
            {actions.map((action, index) => (
              <Link className={index == actions.length ? "" : "me-3"} to={action.needId ? `${action.url}/${item[idKey]}` : action.url}>{action.linkName}</Link>
            ))}
            </td>) }
          </tr>
        ))}
      </tbody>
    </table>
  )
}