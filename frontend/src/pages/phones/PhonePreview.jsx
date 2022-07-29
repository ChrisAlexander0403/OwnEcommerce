import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import GET_PHONE from '../../graphql/queries/GET_PHONE';
import { PhonePreviewStyles } from '../../styles/PhonesStyles';
import ProductPreview from '../../components/productPreview/ProductPreview';
import { AddShoppingCart, BatteryFull, CameraAlt, FavoriteBorder, Fingerprint, Memory, RemoveShoppingCart, Screenshot, Shop, Smartphone, Storage, WifiTethering } from '@mui/icons-material';
import { addToCart, getItem, removeItem } from '../../features/slices/cartSlice';

const PhonePreview = () => {

    const [phone, setPhone] = useState({});
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PHONE, { variables: { _id: id } });
    const dispatch = useDispatch();
    const cartItem = useSelector(getItem(id));

    const handleAddToCart = () => {
      dispatch(addToCart({
        _id: phone._id,
        sku: phone.sku,
        name: phone.name,
        image: phone.images[0],
        price: phone.price,
        discount: phone.discount,
        quantity: 1
      }));
    }

    const handleRemoveFromCart = () => {
      dispatch(removeItem(cartItem._id));
    }

    useEffect(() => {
      if (data) {
        if (data.getPhone.phone) {
            setPhone(data.getPhone.phone);
        }
      }
    }, [data]);
    

  return (
    <PhonePreviewStyles>
        <div className="main-container">
            { loading ? <p>loading...</p> :
              <>
                <section>
                  <div className="preview">
                    <ProductPreview images={phone.images} host="http://localhost:5000/" />
                    <div className="info-container">
                      <p className="sku">SKU: {phone.sku}</p>
                      <h1 className="name">{phone.name}</h1>
                      <p className="brand">{phone.brand}</p>
                      <p className="price">{numeral(phone.price).format('$0,0.00')}</p>
                      <p className="color">Color: {phone.color}</p>
                      <div className="specs">
                        <div> <Storage className="icon" /> {phone.storage}</div>
                        <div><Memory className="icon" />{phone.memory}</div>
                        <div><Smartphone className="icon" /> {phone.SO}</div>
                      </div>
                      <div className="options">
                        <button className="buy"><Shop className="icon" />Comprar</button>
                        {
                          cartItem ? 
                          <button className="remove-from-cart" onClick={handleRemoveFromCart}><RemoveShoppingCart className="icon" /> Eliminar del carrito</button>
                          :
                          <button className="add-to-cart" onClick={handleAddToCart}><AddShoppingCart className="icon" /> Agregar al carrito</button>
                        }
                        <button className="add-wish-list"><FavoriteBorder className="icon" />Agregar a deseos</button>
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="details">
                    <h2>Detalles</h2>
                    <p className="description">{phone.description}</p>
                    <div className="specs">
                      <div>
                        <Screenshot className="icon" />
                        <p>Pantalla de {phone.display}</p>
                      </div>
                      <div>
                        <Memory className="icon" />
                        <p>Procesador Desconocido</p>
                      </div>
                      <div>
                        <CameraAlt className="icon" />
                        <p>Camaras de {phone.cameras}</p>
                      </div>
                      <div>
                        <BatteryFull className="icon" />
                        <p>Batería de {phone.battery}</p>
                      </div>
                      <div>
                        <WifiTethering className="icon" />
                        <p>{phone.connectivity}</p>
                      </div>
                      {
                        phone.fingerprint === true &&
                        <div>
                          <Fingerprint className="icon" />
                          <p>Con huella digital</p>
                        </div>
                      }
                    </div>
                  </div>
                </section>
              </>
            }   
        </div>
    </PhonePreviewStyles>
  );
}

export default PhonePreview;