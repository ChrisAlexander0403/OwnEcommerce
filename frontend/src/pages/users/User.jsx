import { useQuery } from '@apollo/client';
import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import GET_USER from '../../graphql/queries/GET_USER';
import useImage from '../../hooks/useImage';
import { UserStyles } from '../../styles/UserStyles';

const User = () => {

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            _id: id
        }
    });
    console.log(data)
    const verifyImage = useImage();

  return (
    loading ? <p>loading...</p> : 
    data && 
    <UserStyles>
        <div className="user-container">
            <div className="top">
                <div className="left">
                    <button className="edit">Editar</button>
                    <h1 className="title">Información</h1>
                    <div className="user">
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
                            <h1 className="name">{data.getUser.user.firstname + ' ' +data.getUser.user.lastname}</h1>
                            <div className="item">
                                <span className="itemKey">Email: </span>
                                <span className="itemValue">{data.getUser.user.email}</span>
                            </div>
                            <div className="item">
                                <span className="itemKey">Teléfono: </span>
                                <span className="itemValue">+52 {data.getUser.user.phone}</span>
                            </div>
                            <div className="item">
                                <span className="itemKey">Rol: </span>
                                <span className="itemValue">{data.getUser.user.rol}</span>
                            </div>
                            <div className="item">
                                <span className="itemKey">Status: </span>
                                <span className="itemValue">{data.getUser.user.status}</span>
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
    </UserStyles>
  );
}

export default User;