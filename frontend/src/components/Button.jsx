import React from 'react'

function Button({BtnName, BtnFunction}) {
  return (
    <button className='bg-white border rounded px-4 py-2' onClick={(e)=>{e.preventDefault();{BtnFunction}}}>{BtnName}</button>
  )
}

export default Button