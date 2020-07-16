import React, { useState, useEffect } from 'react'

const Button = (props) => {
  return <div className='button-button' onClick={props.onClick}>{props.value}</div>
}

export default Button