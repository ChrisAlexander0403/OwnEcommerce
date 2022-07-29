import { ImageNotSupported, RemoveShoppingCart, ShoppingCart } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeItem, selectCart } from '../../features/slices/cartSlice';
import useImage from '../../hooks/useImage';
import { ProductContainer } from './ProductStyles';

const Product = ({ data }) => {
    
    const image = useImage();
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const handleAddToCart = () => { 
        dispatch(addToCart({
            _id: data._id,
            sku: data.sku,
            name: data.name,
            image: data.images[0],
            price: data.price,
            discount: data.discount,
            quantity: 1
        }));
    }

    const handleRemoveItem = () => {
        dispatch(removeItem(data._id));
    }

    return (
        <ProductContainer to={`${data._id}/details`}>
            <div className="img-container">
                {
                    image(`http://localhost:5000/${data.images[0]}`).exists ? 
                    <img src={`http://localhost:5000/${data.images[0]}`} alt="" /> :
                    <ImageNotSupported className="icon" />
                }
            </div>
            <div className="details-container">
                <h4>{data.name}</h4>
                <p className="brand">{data.brand}</p>
                <p>${data.price}</p>
            </div>
            <div className="buttons-container">
                <Link to={`${data._id}/buy`}>Comprar</Link>
                <div className="cart" onClick={(e) => e.preventDefault()}>
                    <div className="text">Carrito</div>
                    {
                        cart.find(item => item._id === data._id) ?
                        <button 
                            style={{ background: 'rgb(161, 36, 49)' }} 
                            onClick={handleRemoveItem}
                        >
                            <RemoveShoppingCart style={{ color: '#fff' }} />
                        </button>
                        :
                        <button 
                            style={{ background: 'rgb(200, 191, 211)' }}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart style={{ color: 'rgb(36, 0, 80)' }} />
                        </button>
                    }
                </div>
            </div>
        </ProductContainer>
    );
}

export default Product;