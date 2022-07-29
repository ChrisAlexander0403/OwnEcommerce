import React from 'react';
import { WidgetStyles } from './WidgetStyles';
import { IoIosArrowDown } from 'react-icons/io';
import { AccountBalanceWalletOutlined, MonetizationOnOutlined, PersonOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const Widget = ({ type, link }) => {

    let data;
    switch(type) {
        case "client": 
            data = {
                title: "CLIENTES",
                isMoney: false,
                link: "Ver todos los clientes",
                icon: <PersonOutlined className="icon" />
            };
            break;
        case "order":
            data = {
                title: "ÓRDENES",
                isMoney: false,
                link: "Ver todas las órdenes",
                icon: <ShoppingCartOutlined className="icon" />
            }
            break;
        case "earning":
            data = {
                title: "GANANCIAS",
                isMoney: true,
                link: "Ver todas las ganancias",
                icon: <MonetizationOnOutlined className="icon" />
            }
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "Ver detalles",
                icon: <AccountBalanceWalletOutlined className="icon" />
            }
            break;
        default: 
            break;
    }

    return (
        <WidgetStyles>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney ? numeral(2060).format("$0,0.00") : numeral(2060).format("0,0")}</span>
                <Link to={link} className="link">{data.link}</Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <IoIosArrowDown />
                    20%
                </div>
                {data.icon}
            </div>
        </WidgetStyles>
    );
}

export default Widget;