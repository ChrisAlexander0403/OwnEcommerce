import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../../features/slices/cartSlice';
import { BillStyles } from './BillStyles';

const Bill = () => {

    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    let cart = useSelector(selectCart);

    useEffect(() => {
        let sub = 0, dis = 0, tot = 0;
        cart.map(item => {
            sub = sub + (item.price * item.quantity);
            dis = dis + ((item.price * item.discount / 100) * item.quantity);
        });
        setSubtotal(sub);
        setDiscount(dis);
        setTotal(sub - dis);
    }, [cart]);
    

  return (
    <BillStyles>
        <h2>Cuenta</h2>
        <span>Intecel / Carrito de compras</span>
        <hr />
        <div className="pricing">
            <p>Subtotal</p>
            <p>{numeral(subtotal).format("$0,0.00")}</p>
        </div>
        <div className="pricing">
            <p>Descuento</p>
            <p>{"-" + numeral(discount).format("$0,0.00")}</p>
        </div>
        <div className="pricing">
            <p>Total</p>
            <p>{numeral(total).format("$0,0.00")}</p>
        </div>
        <button>Continuar compra</button>
        <p>¿Te falta algún producto?</p>&nbsp;<Link to="/">Sigue comprando</Link>
    </BillStyles>
  );
}

export default Bill;