import React, { useState, useContext } from 'react'
import "./Home.css"
import ProductsContext  from "../context/ProductsProvider";
import FullCustomerDetailsContext  from "../context/FullCustomerDetailsProvider";
import Product from './Product'
import FullProduct from './FullProduct';

function Home(props) {
  const { products } = useContext(ProductsContext)
  const { fullCustomerDetails } = useContext(FullCustomerDetailsContext)


  const [showFullProduct, setShowFullProduct] = useState(false);
  const [fullProduct, setFullProduct] = useState();


  const onShowFullProduct = (product) => {
    setFullProduct(product);
    setShowFullProduct(!showFullProduct);
  }

  return (
    <div className='home-container'>
      {fullCustomerDetails?.customer && <div className='home-hello'><h2>Hello {fullCustomerDetails.customer.firstName}</h2></div>}
      <div className='products-container'>
          {products.map(prd => (
            <Product 
              key={prd.id} 
              product={prd} 
              handleAddProducToCart={props.handleAddProducToCart} 
              handleProducToWishlist={props.handleProducToWishlist}
              handleRemoveProducFromWishlist={props.handleRemoveProducFromWishlist}
              onShowFullProduct={onShowFullProduct} 
                />
            ))}
            {showFullProduct && 
              <FullProduct 
                product={fullProduct} 
                handleAddProducToCart={props.handleAddProducToCart} 
                handleProducToWishlist={props.handleProducToWishlist} 
                handleRemoveProducFromWishlist={props.handleRemoveProducFromWishlist}
                onShowFullProduct={onShowFullProduct} 
                />
                }
      </div>
    </div>
  )
}

export default Home