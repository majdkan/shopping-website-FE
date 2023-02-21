import React, { useState, useContext } from 'react'
import "./Checkout.css"
import CartContext from "../context/CartProvider"
import FullCustomerDetailsContext from "../context/FullCustomerDetailsProvider"
import AuthContext from '../context/AuthProvider' 
import OrdersContext from '../context/OrdersProvider' 
import { checkOutOrder, getOpenOrder } from "../../services/api"
import countTotalPrice from '../../utils/totalPriceCounter';
import dateFormatting from "../../utils/dateFormatting"



function Checkout() {
    const { cart, setCart } = useContext(CartContext)
    const { orders, setOrders } = useContext(OrdersContext)
    const { fullCustomerDetails } = useContext(FullCustomerDetailsContext)
    const { auth } = useContext(AuthContext)
    const [ name , setName ] = useState(``)
    const [ country , setCounrty ] = useState(``)
    const [ city , setCity ] = useState(``)
    const [ phoneNumber , setPhoneNumber ] = useState(``)
    const [ orderCompleted, setOrderCompleted ] = useState()



    const handleSubmit = async (e) => {
        e.preventDefault();
            const order = await getOpenOrder(fullCustomerDetails.customer.id, auth)
            const newOrderBody ={
                customerId: fullCustomerDetails.customer.id,
                orderDate: dateFormatting(),
                country: country,
                city: city,
                phoneNumber: phoneNumber,
                totalProducts: cart.length,
                totalPrice:  countTotalPrice(cart),
            }
            await checkOutOrder(order.data.id,newOrderBody, auth)

            const orderToLastOrders = {
                order: {id: order.data.id, orderDate:newOrderBody.orderDate, totalProducts: newOrderBody.totalProducts, totalPrice: newOrderBody.totalPrice},
                products: cart
            }
            setOrders([...orders, orderToLastOrders])
            setCart([]) 
            setOrderCompleted(`Order completed,  Your order id is ${order.data.id}`)
    }

    return (
        <>
        {orderCompleted ? 
            <div className='check-success'>{orderCompleted}</div> 
            :
            <form className='checkout-form' onSubmit={handleSubmit}>
                <div className='checkout-name'>
                    <label htmlFor='address'>Name:</label>
                    <input
                        type="text"
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                </div>
                <div className='checkout-country'>
                    <label htmlFor='country'>Country:</label>
                    <input
                        type="text"
                        id='country'
                        value={country}
                        onChange={(e) => setCounrty(e.target.value)}
                        required
                    />
                </div>
                <div className='checkout-city'>
                    <label htmlFor='city'>City:</label>
                    <input
                        type="text"
                        id='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className='checkout-phone-number'>
                    <label htmlFor='phoneNumber'>Phone Number:</label>
                    <input
                        type="text"
                        id='phoneNumber'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <button className='checkout-btn' type='submuit' disabled={!country || !name}>
                Finish Order
                </button>
    </form>   
    }
    </>
      )
    }
    

export default Checkout