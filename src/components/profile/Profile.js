import React,{ useContext, useState } from 'react'
import AuthContext from "../context/AuthProvider"
import FullCustomerDetailsContext from "../context/FullCustomerDetailsProvider"
import CartContext from "../context/CartProvider"
import OrdersContext from "../context/OrdersProvider"
import { deleteCustomer } from "../../services/api"
import { useNavigate } from 'react-router-dom'
import LastOrder from './lastorders/LastOrder'
import "./Profile.css"



function Profile() {
    const { auth , setAuth } = useContext(AuthContext);
    const { fullCustomerDetails, setFullCustomerDetails } = useContext(FullCustomerDetailsContext);
    const { setCart } = useContext(CartContext);
    const { orders , setOrders } = useContext(OrdersContext)
    const [ customerDeleted , setCustomerDeleted ] = useState(false)

    const navigate = useNavigate();

    
  
    const showLastOrders = (orders) => {
      return (<div className='profile-last-orders'>
      {orders.map((order, index) => (
       <LastOrder 
          key={index} 
          orderId={order.order.id} 
          orderDate={order.order.orderDate} 
          totalProducts={order.order.totalProducts} 
          totalPrice={order.order.totalPrice} 
          products={order.products}/>
       ))}
    </div>)
    }
  
    const emptyOrder = () => {
      return (<div className='shop-cart-empty'>
        <h2>No Orders</h2>
      </div>)
    }

    const handleDeleteCustomerBtn = async () => {
      await deleteCustomer(fullCustomerDetails.customer.id, auth);
      setAuth({});
      setFullCustomerDetails();
      setCart([]);
      setOrders([]);
      setCustomerDeleted(true)
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
  }

  return (
    <>
    {!customerDeleted ? (
      <div className="profile-container">
        {orders.length > 0 ? showLastOrders(orders) : emptyOrder()}
        <button className="profile-delete-btn" onClick={handleDeleteCustomerBtn}>
          Delete Account !
        </button>
      </div>
    ) : (
      <div className="profile-container">
        <h2>Account Deleted Succesefuly</h2>
      </div>
    )}
  </>
);
}

export default Profile