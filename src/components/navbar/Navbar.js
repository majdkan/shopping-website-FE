import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import "./Navbar.css"
import { FaShoppingBag, FaTimes, FaBars, FaUserAlt, FaRegHeart } from "react-icons/fa";
import FullCustomerDetailsContext from '../context/FullCustomerDetailsProvider';
import Cart from '../cart/Cart'
import SignIn from '../userLoginReg/SignIn';
import Search from '../search/Search';



function Navbar(props) {
  const { fullCustomerDetails, setFullCustomerDetails } = useContext(FullCustomerDetailsContext)
  const [ activeIndex, setActiveIndex ] = useState(null);
  const [ cartOpen, setCartOpen ] = useState(false)
  const [ signInOpen, setSignInOpen ] = useState(false)
  const [ mobileNavOpen, setMobileNavOpen ] = useState(true)
  const [ wishlistOpen, setWishlistOpen ] = useState(false)

  
  const handleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
    setCartOpen(false)
    setSignInOpen(false)
    setWishlistOpen(false)
  }

  const handleLogoBtn = (index) => {
    handleIndex(index)
    setCartOpen(false)
    setSignInOpen(false)
    setWishlistOpen(false)
    setMobileNavOpen(true)
  }

  const handleLogInBtn = (index) => {
    handleIndex(index)
    setCartOpen(false)
    setSignInOpen(!signInOpen)
    setWishlistOpen(false)
  }

  const handleLogOutBtn = (index) => {
    handleIndex(index)
    setCartOpen(false)
    setSignInOpen(false)
    setFullCustomerDetails(``)
    window.location.reload()
  }

  const handleWishlist = (index) => {
    handleIndex(index)
    setCartOpen(false)
    setSignInOpen(false)
    setMobileNavOpen(!mobileNavOpen)
  }

  const handleProfile = (index) => {
    handleIndex(index)
    setCartOpen(false)
    setSignInOpen(false)
    setWishlistOpen(false)
    setMobileNavOpen(!mobileNavOpen)

  }

  const handleSignUp = (index) => {
    handleIndex(index)
    setCartOpen(false)
    setSignInOpen(false)
    setWishlistOpen(false)
    setMobileNavOpen(!mobileNavOpen)
  }

  const handleCart = (index) => {
    handleIndex(index)
    setCartOpen(!cartOpen)
    setSignInOpen(false)
    setWishlistOpen(false)
    setMobileNavOpen(!mobileNavOpen)
  }

 

  const handleIndex = (index) => {
    activeIndex === index ? setActiveIndex(null) : setActiveIndex(index); 
  }



  useEffect(() => {
    if(fullCustomerDetails){
        setTimeout(() => {
          setSignInOpen(false)
        }, 3000);
    } 
}, [fullCustomerDetails])

  return (
    <nav className='nav-container'>

<ul className='navbar'>
          <Link to="/" className="nav-logo" onClick={() => handleLogoBtn(null)}>
          Shopping Easely

          </Link>

          <Search handleAddProducToCart={props.handleAddProducToCart}/>
          
          <div className={`nav-routes ${!mobileNavOpen ? 'active' : ""}`}>
            {
              !fullCustomerDetails ?  
              <li className={`nav-login ${activeIndex === 0 ? 'active' : ''}`} onClick={() =>handleLogInBtn(0)}>
                Login
              </li> :
              <li className={`nav-logout`} onClick={() => handleLogOutBtn(null)}>
                Log Out
              </li>
            }

            {
              !fullCustomerDetails &&    
              <li className={`nav-signup ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleSignUp(1)}>
                <Link to="/signup">Sign Up</Link>
              </li>  
            }


            <li className={`wishlist-btn ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleWishlist(2)}>
              <Link to="/wishlist"><FaRegHeart /></Link>
            </li> 

            {
              fullCustomerDetails &&  
              <li className={`profile-btn ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleProfile(3)}>
                <Link to="/profile"><FaUserAlt /></Link>
              </li> 
            }
           
            <li className={`shop-cart-btn ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleCart(4)}>
              <FaShoppingBag />
            </li>

          </div>

        <div className="nav-mobile" onClick={handleMobileNav}>{!mobileNavOpen ? <FaTimes/> : <FaBars/>}</div>
      </ul>
        {signInOpen && <SignIn />}
        {cartOpen && <Cart />}
     </nav>
  )
}

export default Navbar
