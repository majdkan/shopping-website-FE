import React, { useState, useContext } from 'react'
import "./Search.css"
import ProductsContext from "../context/ProductsProvider"
import SearchProduct from './SearchProduct'

function Search(props) {
    const { products } = useContext(ProductsContext)
    const [ searchVal, setSearchVal ] = useState("")


  return (
    <div className='search-container'>
        <input className='search-input' type='text' placeholder='Search' onChange={(e) => {setSearchVal(e.target.value)}}/>
        <div className='search-products-container'>
            {products.filter((product) => {
                if(searchVal === ""){
                    return ``;
                }else if(product.name.toLowerCase().includes(searchVal.toLowerCase())){
                    return product;
                }
            })
            .map((val) => {
                return(
                    <SearchProduct key={val.id} product={val} handleAddProducToCart={props.handleAddProducToCart}/>
                )
            })
            }
        </div>
    </div>
  )
}

export default Search