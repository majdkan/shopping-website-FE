import React from 'react'
import "./LastOrder.css"
import LastOrderProduct from './LastOrderProduct'

function LastOrder(props) {
    const { orderId, orderDate, totalPrice, totalProducts } = props
  return (
    <div className='last-order-container'>
        <div className='last-order-details'>
            <h3>Order Id: {orderId}</h3>
            <p>Order Date: {orderDate}</p>
            <p>Total Products: {totalProducts}</p>
            <p>Total Price: ${totalPrice}</p>
        </div>
        <div className='last-order-products'>
          {props.products.map(product => (
            <LastOrderProduct 
                key={product.id} 
                name={product.name} 
                img={product.img}/>
          ))}
        </div>
    </div>
  )
}

export default LastOrder