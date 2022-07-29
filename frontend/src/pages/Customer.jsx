import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import Chart from '../components/chart/Chart';
import Table from '../components/table/Table';
import useImage from '../hooks/useImage';
import { CustomerStyles } from '../styles/CustomerStyles';

const Customer = () => {

    const verifyImage = useImage();

  return (
    <CustomerStyles>
        <div className="customer-container">
            <div className="top">
                <div className="left">
                    <button className="edit">Editar</button>
                    <h1 className="title">Información</h1>
                    <div className="customer">
                        {
                            verifyImage("assets/img/woman-1127201_1920.jpg").exists ? 
                            <div className="img-container">
                                <img src="assets/img/woman-1127201_1920.jpg" alt="" />
                            </div> :
                            <div className="avatar">
                                <BsFillPersonFill />
                            </div>
                        }
                        <div className="details">
                            <h1 className="name">Christian Vázquez</h1>
                            <div className="item">
                                <span className="itemKey">Email: </span>
                                <span className="itemValue">chrisalexvazquez0211@gmail.com</span>
                            </div>
                            <div className="item">
                                <span className="itemKey">Teléfono: </span>
                                <span className="itemValue">+52 999 746 6773</span>
                            </div>
                            <div className="item">
                                <span className="itemKey">Birthdate: </span>
                                <span className="itemValue">11 de Febrero de 2000</span>
                            </div>
                            <div className="item">
                                <span className="itemKey">Status: </span>
                                <span className="itemValue">Verificado</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <Chart aspect={3 / 1} title="Compras realizadas los últimos 6 meses" />
                </div>
            </div>
            <div className="bottom">
                <h1 className="title">Transacciones más recientes</h1>
                <Table />
            </div>
        </div>
    </CustomerStyles>
  );
}

export default Customer;