import React, { useState, useContext } from 'react'
import "./SignIn.css"
import AuthContext from "../context/AuthProvider";
import FullCustomerDetailsContext from "../context/FullCustomerDetailsProvider";
import CartContext from "../context/CartProvider";
import OrdersContext from '../context/OrdersProvider' 
import WishlistContext from "../context/WishlistProvider";
import { authenticate, getFullCustomerProfile } from "../../services/api"
import { useForm } from 'react-hook-form';


function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const { fullCustomerDetails, setFullCustomerDetails } = useContext(FullCustomerDetailsContext);
  const { setCart } = useContext(CartContext);
  const { setOrders } = useContext(OrdersContext)
  const { setWishlist } = useContext(WishlistContext);
  const [errMsg, setErrMsg] = useState("");


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try{
        const jwtRes = await authenticate(data)
        setAuth(jwtRes.data.jwt)
        const profileAndProductsRes = await getFullCustomerProfile(data.username, jwtRes.data.jwt)
        setFullCustomerDetails(profileAndProductsRes.data)

        if(profileAndProductsRes.data.cartProducts) setCart(profileAndProductsRes.data.cartProducts)
        if(profileAndProductsRes.data.wishlistProducts) setWishlist(profileAndProductsRes.data.wishlistProducts)
        if(profileAndProductsRes.data.orderLists) setOrders(profileAndProductsRes.data.orderLists)


        reset();

        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response.status === 403) {
                setErrMsg("Incorrect Username Or Password");
            } else {
                setErrMsg("Authentication Failed");
            }
        }
    
   
  };
  return (
    <>
    {fullCustomerDetails ? (
        <div className='signin-container success'>
          <h1>Succesefuly logged in!</h1>
          <br />
        </div>
            ) : (
        <div className='signin-container'>
            <h2>Login</h2>
            <form className='signin-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='signin-form-field'>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type="text"
                        id='username'
                        name='username'
                        {...register('username')}
                    />
                </div>

                <div className='signin-form-field'>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type="password" 
                        id='password'
                        name='password'
                        {...register('password')}
                    />
                </div>
                {errMsg}
                <button className='signin-btn' type='submut'>Sign In</button>
            </form>
        </div>
        )}
    </>
  )
}


export default SignIn