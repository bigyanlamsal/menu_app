import React, { useEffect, useState } from "react";
import "./orders.css";

const Orders = (props) => {

  const [show, setShow] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    if (JSON.parse(localStorage.getItem("ordersList"))) {
      setOrders(JSON.parse(localStorage.getItem("ordersList")).ordersList);
      
    }
    
  }, [props.refreshInt]);

  const handleToggle = () => {
    setShow(!show)
  }

  return (
    <div className="ordersContainer">
     
      <div className="showOrders" onClick={handleToggle}>{show ? "Hide List" : "Show Previous Orders"}</div>
      {show &&  <div className="listContainer">
        {console.log(orders)}
        {
          (orders && (orders.length > 0 )) ? orders.map((item, index) => <div className="row" key={index}>
            <div key={index} className="orderItem">
              {
                item.cartItems.map((cartItem, itemIndex) => <div key={itemIndex}>
                  {cartItem.dishName} &nbsp; {cartItem.count}
                </div>)
              }
            </div>

            <div className="billAmount">
              {item.totalAmount}/-
            </div>
          </div>)
          : <div className="noOrders">No Previous Orders</div>
        }
      </div>}
    </div>
  );
}

export default Orders;