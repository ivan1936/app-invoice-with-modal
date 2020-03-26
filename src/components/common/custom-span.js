import React from 'react'

const CustomSpan = props => (
  <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={props.onClick}>
    {props.isDesc ? String.fromCharCode(9651) : String.fromCharCode(9661)}
  </span>    
)

export default CustomSpan;
