import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [user, setUser] = useState();

  useEffect(() => {
    const items = Cookies.get('cartItems');
    const quantity = Cookies.get('totalQuantity');

    if (items) {
      const data = JSON.parse(items);
      const number = JSON.parse(quantity);
      setCartItems(data)
      setTotalQuantities(number)
    }

  }, [])

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      const account = JSON.parse(user)
      setUser(account)
    }
  }, [])

  let foundProduct;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find((item) => item._id === product._id);
    
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      let updatedCartItems = [];
      cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {

          const updatedItem = {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
     
          updatedCartItems.push(updatedItem)
        }
        else {
          updatedCartItems.push(cartProduct)
        }
      })

      setCartItems(updatedCartItems);
      const number = totalQuantities + quantity

      Cookies.set('totalQuantity', JSON.stringify(number));
      Cookies.set('cartItems', JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
      const items = [...cartItems, { ...product }];

      const number = totalQuantities + quantity;

      Cookies.set('totalQuantity', JSON.stringify(number));
      Cookies.set('cartItems', JSON.stringify(items));
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);

    const number = totalQuantities - foundProduct.quantity;

    Cookies.set('totalQuantity', JSON.stringify(number));
    Cookies.set('cartItems', JSON.stringify(newCartItems))
    toast.success(`${product.name} has been removed from cart.`);
  }

  const addUser = (user) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user))
  }

  const removeUser = () => {
    setUser(null);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showOverlay,
        setShowOverlay,
        cartItems,
        totalQuantities,
        user,
        onAdd,
        onRemove,
        setCartItems,
        setTotalQuantities,
        addUser,
        removeUser
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);