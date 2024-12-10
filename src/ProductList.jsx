import React, { useState,useEffect } from 'react';
import './css/ProductList.css'
import CartItem from './CartItem';
import plantsArray from './data/PlantData';
import { addItem } from './CartSlice';
import { useDispatch } from 'react-redux';


const ProductList = ({ showAbout }) => {
    
    const [showCart, setShowCart] = useState(false); 
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const [addedToCart, setAddedToCart] = useState({});
    const [cartCounter, setCartCounter] = useState(0);

    const dispatch = useDispatch();
    
   const styleA = {
        fontSize: '30px',
        textDecoration: 'none',
   }

   const incrementCounter = () => {
    setCartCounter(prevCounter => prevCounter + 1);
   }

   const decrementCounter = () => {
    setCartCounter(prevCounter => prevCounter - 1);

   }

   const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

   const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    //function add selected plant to the Redux Store for CartSlice & addedToCart state object
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart({
            ...addedToCart,
            [plant.name] : true, 
        });
        incrementCounter();
    }

    //display items from plants array using map method
    const plantsListDisplay = plantsArray.map((item, index) => 
        <div key={index}>
            <h1>{item.category}</h1>
            <div className='product-list'>
                {item.plants.map((plant, plantIndex) =>
                    <div className='product-card' key={plantIndex}>
                        <img src={plant.image} alt="plant" className='product-image' />
                        <div className='product-title'> {plant.name} </div>
                        <p>Description: {plant.description}</p>
                        <div className='product-cost'>Cost: {plant.cost}</div>
                        <button className='product-button' onClick={()=>handleAddToCart(plant)}>Add to Cart</button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div>
            <div className="navbar">
                <div className="tag">
                    <div className="luxury" onClick={showAbout}>
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <div>
                            <h3>Paradise Nursery</h3>
                            <i>Where Green Meets Serenity</i>
                        </div>
                    </div>
              
                </div>
                <div className='nav-links' onClick={(e)=>handlePlantsClick(e)} style={styleA}> Plants </div>
                <div className='nav-links' onClick={(e) => handleCartClick(e)} style={styleA}> <i className="fa-solid fa-cart-shopping"></i> {cartCounter}</div>

                {/* <div className='nav-links' onClick={(e) => handleCartClick(e)} style={styleA}> <h1 className='cart'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path></svg></h1>{cartCounter}</div> */}
            
            </div>
            {!showCart? (
                <div className="product-grid">
                    {plantsListDisplay}
                </div>
            ) :  (
                <CartItem onContinueShopping={handleContinueShopping} decrementCounter={decrementCounter} incrementCounter={incrementCounter}/>
            )}
        </div>
    );
}

export default ProductList;
