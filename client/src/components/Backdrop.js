import React from 'react';

const Backdrop = props => {
  return (
    <div className="backdrop" onClick={props.click}></div>
  )
}

export default Backdrop;