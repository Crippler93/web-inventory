import React from 'react'
import { useItemContext } from './context/ItemContext'

export const ItemToast = () => {

  const {toastActive, closeToast, toastTitle, toastBody} = useItemContext()

  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" className={`toast ${toastActive ? 'show': 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">{toastTitle}</strong>
          <button type="button" onClick={closeToast} className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {toastBody}
        </div>
      </div>
    </div>
  )
}