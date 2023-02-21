import React from 'react'
import "./OrderProduct.css"
import { FaRegMinusSquare } from "react-icons/fa";

function OrderProduct(props) {
  const { name, price, img } = props.product

  return (
    <div className='order-product'>
        <img src={img} alt={name} />
        <h2 className='order-product-name'>{name}</h2>
        <p className='order-product-price'>{price}$</p>
        <FaRegMinusSquare className='order-product-delete-icon' onClick={() => props.handleRemoveProducFromCart(props.product)} />
    </div>
  )
}

export default OrderProduct