import React from 'react';
import './Card.css';

const Card = ({ item, index }) => {
  return (
    <div className="containerCard">
      <div className="dish">
        {/* <div> */}
        <img src={item.image} alt={item.name} className="image" />
        {/* </div> */}

      </div>
      <div className="priceContainer">
        <div className="dishName">{item.dishName}</div>
        Rs.&nbsp;{item.price}
      </div>
    </div>
  );
}

export default Card;