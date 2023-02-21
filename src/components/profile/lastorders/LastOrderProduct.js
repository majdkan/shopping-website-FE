import React from 'react'
import "./LastOrderProduct.css"

function LastOrderProduct(props) {
    const {img, name} = props
  return (
    <div className='last-order-product-container'>
        <img src={img} alt={name} />
        <p>{name}</p>
    </div>
  )
}

export default LastOrderProduct