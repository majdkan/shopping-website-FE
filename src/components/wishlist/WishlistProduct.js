import React from 'react'
import "./WishlistProduct.css"
import { FaHeart } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

function WishlistProduct(props) {
  const { name, viewDescription, price, img, quantity} = props.product
  
  return (
    <div className='wishlist-product'>
        <img src={img} alt={name} onClick={() => props.onShowFullProduct(props.product)} />
        <h2 className='wishlist-product-name'>{name}</h2>
        <p className='wishlist-product-desc'>{viewDescription}</p>
        <p className='wishlist-product-price'>{price}$</p>
        <div className='product-botton'>
          <p className='wishlist-product-quantity'>{quantity > 0 ? `only: ${quantity} Left` : `Out Of Stock`}</p>
          <div className='wishlist-product-right'>
            <FaHeart className='wishlist-product-wish-btn' onClick={() => props.handleRemoveProducFromWishlist(props.product)} />
            <IoIosAddCircle className='wishlist-product-add-to-cart' onClick={() => props.handleAddProducToCart(props.product)} />
          </div>
        </div>
    </div>
  )
}

export default WishlistProduct