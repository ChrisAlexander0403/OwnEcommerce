import React from 'react';
import { AccountBox, CreditCard, Dashboard, Group, Headphones, LocalShipping, Logout, ManageAccounts, Notifications, Person, PhoneAndroid, QueryStats, Settings, ViewQuilt } from '@mui/icons-material';
import { SidebarStyles } from './SidebarStyles';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <SidebarStyles>
      <div className="top">
        <div className="img-container">
          <img src='assets/img/logo.png' alt='Intecel Logo' onClick={() => navigate("/")} />
        </div>
        <span>Admin</span>
      </div>
      <hr/>
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <li><NavLink to=""><Dashboard className="icon" /><span>Dashboard</span></NavLink></li>
          <li><NavLink to="customers"><Person className="icon" /><span>Clientes</span></NavLink></li>
          <li><NavLink to="phones"><PhoneAndroid className="icon" /><span>Celulares</span></NavLink></li>
          <li><NavLink to="accessories"><Headphones className="icon" /><span>Accesorios</span></NavLink></li>
          <li><NavLink to="orders"><CreditCard className="icon" /><span>Órdenes</span></NavLink></li>
          <li><NavLink to="delivery"><LocalShipping className="icon" /><span>Entregas</span></NavLink></li>
          <p className="title">HERRAMIENTAS</p>
          <li><NavLink to="interface"><ViewQuilt className="icon" /><span>Interfaz</span></NavLink></li>
          <li><NavLink to="stats"><QueryStats className="icon" /><span>Estadísticas</span></NavLink></li>
          <li><NavLink to="notifications"><Notifications className="icon" /><span>Notificaciones</span></NavLink></li>
          <p className="title">AJUSTES</p>
          <li><NavLink to="users"><ManageAccounts className="icon" /><span>Usuarios</span></NavLink></li>
          <li><NavLink to="sessions"><Group className="icon" /><span>Sesiones</span></NavLink></li>
          <li><NavLink to="settings"><Settings className="icon" /><span>Configuración</span></NavLink></li>
          <li><NavLink to="profile"><AccountBox className="icon" /><span>Perfil</span></NavLink></li>
          <li><button><Logout className="icon" /><span>Cerrar sesión</span></button></li>
        </ul>
      </div>
    </SidebarStyles>
  );
}

export default Sidebar;