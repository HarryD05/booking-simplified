import React from 'react';

const DrawerToggleButton = props => {
  return (
    <button className="toggle-btn" onClick={props.click}>
      <div className="toggle-btn-line" />
      <div className="toggle-btn-line" />
      <div className="toggle-btn-line" />
    </button>
  )
}

export default DrawerToggleButton;