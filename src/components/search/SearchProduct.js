import React from 'react'
import "./SearchProduct.css"
import { IoIosAddCircle } from "react-icons/io";


function SearchProduct(props) {
    const { img, name, price, quantity} = props.product

    const priceClass = quantity > 0 ? 'price' : 'priceOOS';
    
  return (
    <div className='search-product-result'>
        <img src={img} alt={name}/>
        <h3>{name}</h3>
        <div className='search-product-result-right'>
            <p className={priceClass}>${price}</p>
            
            <IoIosAddCircle className='search-product-add-to-cart' onClick={quantity > 0 ? () => props.handleAddProducToCart(props.product) : null} />
        </div>
    </div>
  )
}

export default SearchProduct