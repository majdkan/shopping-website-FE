import { useContext, useEffect,useState} from 'react'
import { Route, Routes } from "react-router-dom";
import AuthContext from "./components/context/AuthProvider";
import CartContext from "./components/context/CartProvider";
import ProductsContext from './components/context/ProductsProvider';
import FullCustomerDetailsContext  from "./components/context/FullCustomerDetailsProvider";
import WishlistContext  from "./components/context/WishlistProvider";
import { getAllProducts , addProductToCart, addWishlistProduct, removeWishlistProduct } from './services/api'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Signup from './components/userLoginReg/Signup'
import Checkout from './components/checkout/Checkout';
import Profile from './components/profile/Profile';
import Wishlist from './components/wishlist/Wishlist';



function App() {
  const { auth } = useContext(AuthContext)
  const { cart, setCart } = useContext(CartContext)
  const { fullCustomerDetails } = useContext(FullCustomerDetailsContext)
  const { wishlist, setWishlist } = useContext(WishlistContext)
  const { setProducts } = useContext(ProductsContext)
  const [errMsg, setErrMsg] = useState("");

  const handleRemoveProducFromWishlist = async (wishlistProductToRemove) => {
    const wishlistProductToRemoveId = wishlist.filter(product => product.id === wishlistProductToRemove.id);
    await removeWishlistProduct(wishlistProductToRemoveId[0].indexId, auth);
    setWishlist(wishlist.filter(wishlistProduct => wishlistProduct.id !== wishlistProductToRemove.id))
  }

  useEffect(() => {
    getAllProducts()
      .then(res => {
        setProducts(res.data);
      })
  }, [cart]);


  const handleProducToWishlist = async (product) => {
    let isInArray = false;
    wishlist.forEach(prd => {
      if(prd.id === product.id)
        isInArray = true
    })
    if (!isInArray)
    {
      const bodyParams = {
        customerId: fullCustomerDetails.customer.id,
        productId: product.id
      }
      try{
        const res = await addWishlistProduct(bodyParams, auth)
        setWishlist([...wishlist, {...product, indexId:res.data}])
    } catch(err){
      if(!err.response){
        setErrMsg('No Server Response')
      }
    }      
  }
}

  const handleAddProducToCart = async (product) => {
    let isInArray = false;
    cart.forEach(prd => {
      if(prd.id === product.id)
        isInArray = true
    })
    if (!isInArray)
    {
      const bodyParams = {
        orderId: null,
        customerId: fullCustomerDetails.customer.id,
        productId: product.id,
        quantity: 1,
        price: product.price
      };
      try{
      const res = await addProductToCart(bodyParams, auth)
      setCart([...cart, {...product, indexId:res.data}])
    } catch(err){
      if(!err.response){
        setErrMsg('No Server Response')
      }else if(err.response.status === 500){
        setErrMsg('Product Out Of Stock')
      }else {
        setErrMsg("Authentication Failed");
      }
    }      
  }
}

   
  return (
      <div className="app-container">
        <Header handleAddProducToCart={handleAddProducToCart}/>
        <Routes>
          <Route path="/" element={<Home handleAddProducToCart={handleAddProducToCart} 
                                        handleProducToWishlist={handleProducToWishlist} 
                                        handleRemoveProducFromWishlist={handleRemoveProducFromWishlist}/>}
                                        />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist handleAddProducToCart={handleAddProducToCart} 
                                                    handleRemoveProducFromWishlist={handleRemoveProducFromWishlist} />} 
                                                    />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;


