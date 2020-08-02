import React from 'react';

const Modal = props => {
  const { title, children, canCancel, onCancel, canConfirm, onConfirm, confirmText } = props;

  return (
    <div className="modal">
      <header>
        <h1>{title}</h1>
      </header>
      <section className="modal-content">
        {children}
      </section>
      <section className="modal-actions">
        {canCancel ? <button className="btn" onClick={onCancel}>Cancel</button> : null}
        {canConfirm ? <button type="submit" className="btn" onClick={onConfirm}>{confirmText}</button> : null}
      </section>
    </div>
  );
}

export default Modal;