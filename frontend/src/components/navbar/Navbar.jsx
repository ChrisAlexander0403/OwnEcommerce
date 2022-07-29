import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { Logout, Settings, ShoppingCart } from '@mui/icons-material';

// import { selectTheme } from '../../features/slices/themeSlice';
import { ConfirmClose, NavbarStyles } from './NavbarStyles';
import { removeUser, selectUser } from '../../features/slices/userSlice';
import { deleteCart, selectCart } from '../../features/slices/cartSlice';
import { logout } from '../../features/slices/sessionSlice';
import Modal from '../modal/Modal';
import useModal from '../../hooks/useModal';

const Navbar = () => {

    const [click, setClick] = useState(false);
    const [visible, setVisible] = useState(false);

    let navigate = useNavigate();
    let user = useSelector(selectUser);
    let cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const [isOpen, openModal, closeModal] = useModal();

    const redirect = () => {
        navigate('/settings/account');
        setClick(false);
    }
    
    const closeMobile = () => setClick(false);

    const handleCloseSession = () => {
        dispatch(deleteCart());
        dispatch(logout());
        dispatch(removeUser());
        closeModal();
    }
    
    window.onclick = (e) => {
        if(!e.target.classList.contains('drop-account-btn')) {
            if (visible) {
                setVisible(false);
            }
        }
    }

    return (
        <>
        <NavbarStyles>
            <Link to="/" className='logo'><img src="assets/img/logo.png" alt="Intecel" /></Link>
            <div className="mobile" onClick={() => setClick(!click)}>
                { click ? <CgClose /> : <AiOutlineMenu /> }
            </div>
            <ul className={click ? 'active' : null}>
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/dashboard" onClick={closeMobile}>Dashboard</NavLink></li>
                <li><NavLink to="/phones" onClick={closeMobile}>Celulares</NavLink></li>
                <li><NavLink to="/accessories" onClick={closeMobile}>Accesorios</NavLink></li>
                <li><NavLink to="/plans" onClick={closeMobile}>Planes</NavLink></li>
                <li>
                    <NavLink to="/cart">
                        <div className="cart-container">
                            <ShoppingCart className="icon"/>
                            {
                                cart.length > 0 && <div className="quantity-container">{cart.length}</div>
                            }
                        </div>
                    </NavLink>
                </li>
                {
                    user ? 
                    <li>
                        <div className="account-container">
                            <p onClick={redirect} className="user">{user.firstname}</p>
                            <button className="drop-account-btn" onClick={() => setVisible(!visible)}>
                            </button>
                            <div id="nav-dropdown" className={`account-menu ${visible && 'show'}`}>
                                <ul>
                                    <li>
                                        <Link to="settings"><Settings className="icon"/> Configuración</Link>
                                    </li>
                                    <li>
                                        <button onClick={openModal}><Logout className="icon" /> Cerrar sesión</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    :
                    <li><div className="account">
                        <Link to="/login">Iniciar sesión</Link>
                        <hr />
                        <Link to="/register">Registrarse</Link>
                    </div></li>
                }
            </ul>
        </NavbarStyles>
        <Modal
            isOpen={isOpen} closeModal={closeModal} minWidth="420px" minHeight="130px"
            color="gray"
        >
            <ConfirmClose>
                <p>Estás a punto de cerrar sesión</p>
                <div className="buttons">
                    <button onClick={handleCloseSession}>Cerrar sesión</button>
                    <button className="cancel" onClick={closeModal}>Cancelar</button>
                </div>
            </ConfirmClose>
        </Modal>
        </>
    );
}

export default Navbar;