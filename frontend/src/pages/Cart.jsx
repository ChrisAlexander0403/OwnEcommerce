import { Add, Clear, ImageNotSupported, Remove } from '@mui/icons-material';
import numeral from 'numeral';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bill from '../components/bill/Bill';
import { decreaseItemQuantity, increaseItemQuantity, removeItem, selectCart } from '../features/slices/cartSlice';
import useImage from '../hooks/useImage';
import { CartStyles } from '../styles/CartStyles';

const Cart = () => {

    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const image = useImage();

    const getTotal = (price, discount, quantity) => {
      let priceWithoutDiscount = price - (price * discount / 100);
      return priceWithoutDiscount * quantity;
    }

    const handleRemoveItem = (id) => {
      dispatch(removeItem(id));
    }

    const handleIncreaseItemQuantity = (id) => {
      dispatch(increaseItemQuantity(id));
    }

    const handleDecreaseItemQuantity = (id) => {
      dispatch(decreaseItemQuantity(id));
    }

    useEffect(() => {
    }, []);
    
  return (
    <CartStyles>
      <h1>Carrito</h1>
      <div className="main-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>PRODUCTO</th>
              <th>PRECIO</th>
              <th>DESCUENTO</th>
              <th>CANTIDAD</th>
              <th>PRECIO FINAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item) => {
                return(
                  <tr key={item._id}>
                    <td>
                      {
                        image(`http://localhost:5000/${item.image}`).exists ?
                        <div className="image-container">
                          <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                        </div>
                        :
                        <div className="icon-container">
                          <ImageNotSupported className="icon" />
                        </div>
                      }
                    </td>
                    <td>{item.name}</td>
                    <td>{numeral(item.price).format("$0,0.00")}</td>
                    <td>{item.discount > 0 ? item.discount : 'No aplica'}</td>
                    <td>
                      <div className="quantity-container">
                        {
                          item.quantity > 1 &&
                          <button onClick={() => handleDecreaseItemQuantity(item._id)} className="minus"><Remove className="icon" /></button>
                        }
                        <div className="quantity">{item.quantity}</div>
                        <button onClick={() => handleIncreaseItemQuantity(item._id)} className="plus"><Add className="icon" /></button>
                        <button onClick={() => handleRemoveItem(item._id)} className="remove"><Clear className="icon" /></button>
                      </div>
                    </td>
                    <td>{numeral(getTotal(item.price, item.discount, item.quantity)).format("$0,0.00")}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="bill-container">
          <Bill />
        </div>
      </div>
    </CartStyles>
  );
}

export default Cart;