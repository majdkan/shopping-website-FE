import React, {useContext} from 'react'
import "./Product.css"
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import WishlistContext from '../context/WishlistProvider';



function Product(props) {
  const { name, viewDescription, price, img, quantity} = props.product
  const { wishlist } = useContext(WishlistContext)



  const renderWishlistButton = () => {
    const isInWishlist = wishlist.some(item => item.name === props.product.name)
    return isInWishlist ? 
          <FaHeart className='product-wish-btn' onClick={() => props.handleRemoveProducFromWishlist(props.product)} /> 
          : 
          <FaRegHeart className='product-wish-btn' onClick={() => props.handleProducToWishlist(props.product)} />
    }


  
  return (
    <div className='product'>
        <div className='product-img-container'>
          <img src={img} alt={name} onClick={() => props.onShowFullProduct(props.product)} />
        </div>
        <h2 className='product-name'>{name}</h2>
        <p className='product-desc'>{viewDescription}</p>
        <p className='product-price'>{price}$</p>
        <div className='product-botton'>
          <p className='product-quantity'>{quantity > 0 ? `only: ${quantity} Left` : `Out Of Stock`}</p>
          <div className='product-right'>
            {renderWishlistButton()}
            <IoIosAddCircle className='product-add-to-cart' onClick={quantity > 0 ? () => props.handleAddProducToCart(props.product) : null} />
          </div>
        </div>
    </div>
  )
}

export default Product