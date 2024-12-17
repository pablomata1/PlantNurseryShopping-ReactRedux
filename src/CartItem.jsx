import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './css/CartItem.css';

const CartItem = ({ onContinueShopping ,decrementCounter, incrementCounter }) => {
  
  //Allows you to extract data from the Redux store state for use in this component, using a selector function.
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalAmount = cart.reduce((total, item) => total + parseInt(item.cost.slice(1)) * item.quantity, 0);
    return totalAmount;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    let temp = {...item};
    temp.quantity++;
    dispatch(updateQuantity(temp));
    incrementCounter();//updates cart item counter
  };

  const handleDecrement = (item) => {
    let temp = {...item};
    temp.quantity--;    
    decrementCounter(); //updates cart item counter
    if(temp.quantity > 0){
      dispatch(updateQuantity(temp));
   }else{
    dispatch(removeItem(item.name));
   }
  };

  const handleRemove = (item) => {
    for(let i=0; i < item.quantity; i++){
      decrementCounter();//updates cart coutner
    }
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    //find the product from the cart 
    const product = cart.find(element => element.name === item.name);
    //change product cost property into int format and remove $ sign.
    //example: {cost: '$15'} -> 15
    let tempNum = parseInt(product.cost.slice(1));
    return  tempNum * product.quantity;
  };

  const cartListDisplay = cart.map(item => 
    <div className="cart-item" key={item.name}>
      <img className="cart-item-image" src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-cost">{item.cost}</div>
        <div className="cart-item-quantity">
          <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
          <span className="cart-item-quantity-value">{item.quantity}</span>
          <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
        </div>
        <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
        <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
      </div>
    </div>
  );

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartListDisplay}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


