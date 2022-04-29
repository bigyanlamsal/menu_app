import './menu.css';
import { MenuData } from '../../../utils/menuData';
import React, { useEffect, useState } from 'react';
import Card from '../../elements/Card/Card';
import '../cart/cart.css';
import Orders from '../orders/orders';

const Menu = () => {
  const [cartItems, setCartItems] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const [refreshInt, setRefreshInt] = useState(0);

  const handleItemClick = (item) => {

    let checkArr = cartItems.filter(el => el.id === item.id);

    if (checkArr.length === 0) {
      setCartItems([
        ...cartItems,
        { ...item, count: 1 },
      ]);
      setTotalAmount(totalAmount + item.price);

      localStorage.setItem("cartList", JSON.stringify(
        {
          cartList: [
            ...cartItems,
            { ...item, count: 1 },
          ]
        }
      ));
      localStorage.setItem("total", totalAmount + item.price);
    }
    else{

      let currentState = [...cartItems];
      
      let element = checkArr[0];

      // delete element["count"];

      let index = cartItems.indexOf(element);

      currentState[index] = {
        ...element,
        count: element.count + 1,
      }

      setCartItems(currentState);
      setTotalAmount(totalAmount + element.price)
    }
  }

  useEffect(() => {
    let cart = localStorage.getItem("cartList");
    let total = localStorage.getItem("total");


    if (cart) {
      setCartItems(JSON.parse(cart).cartList);
      setTotalAmount(JSON.parse(Number(total)));
    }
  }, []);

  const handleOrder = () => {
    let currentOrders = localStorage.getItem("ordersList");

    if (currentOrders) {
      localStorage.setItem(
        "ordersList",
        JSON.stringify(
          {
            ordersList:
              [
                ...JSON.parse(currentOrders).ordersList,
                { cartItems: cartItems, totalAmount: totalAmount }
              ]
          }
        )
      );
    }
    else {
      localStorage.setItem(
        "ordersList",
        JSON.stringify(
          {
            ordersList:
              [
                { cartItems: cartItems, totalAmount: totalAmount }
              ]
          }
        )
      );
    }

    setCartItems([]);
    setTotalAmount(0);
    setRefreshInt(refreshInt + 1);
  }

  const handleClear = () => {
    localStorage.removeItem("cartList");
    setCartItems([]);
    setTotalAmount(0);
  }

  return (
    <div>
      <Orders refreshInt={refreshInt} />

      <div className="containerMenu">
        {
          MenuData.map((item, index) => <div key={index} onClick={() => { handleItemClick(item) }}>
            <Card item={item} index={index} />
          </div>)
        }
      </div>
      {cartItems.length > 0 && <div className="cartContainer">
        <div className="clearCart" onClick={handleClear}>Clear Cart</div>
        <div className="cartItemsContainer">
          {
            cartItems.map((item, index) => <div className="cartItem" key={index}>
              {item.count} &nbsp; {item.dishName}
            </div>
            )
          }
        </div>
        <div className="pricingContainer">
          <div className="total">Total: Rs {totalAmount}/-</div>
          <button className="order" onClick={handleOrder}>Make Order</button>
        </div>
      </div>}
    </div>
  );
}

export default Menu;