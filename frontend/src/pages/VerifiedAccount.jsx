import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CONFIRM_CLIENT_ACCOUNT from '../graphql/mutations/CONFIRM_CLIENT_ACCOUNT';

const VerifiedAccountStyles = styled.div`
    height: 400px;
    width: 100%;
    padding: 50px;
    background: rgb(36, 0, 80);
    color: #fff;

    & > h1 {
        margin-bottom: 10px;
    }

    & a {
        color: #fff;
        font-weight: bold;
    }
`;

const VerifiedAccount = () => {

    const { token } = useParams();

    const [confirmClientAccount, { data, loading, error }] = useMutation(CONFIRM_CLIENT_ACCOUNT);

    useEffect(() => {
        confirmClientAccount({
            variables: {
                token: token 
            }
        });
        // eslint-disable-next-line
    }, []);
    

    return (
        <>
            <Helmet>
                <title>Cuenta verificada</title>
            </Helmet>
            {
                loading ? <div><p>loading...</p></div> :
                error ? <div><p>Algo salió mal, vuelve a intentarlo más tarde</p></div> :
                <VerifiedAccountStyles className="container">
                    <h1>Gracias por confirmar tu cuenta</h1>
                    <p>No pierdas el tiempo, comienza a comprar ahora. <Link to="/">Haz click aquí.</Link></p>
                </VerifiedAccountStyles>
            }
        </>
    );
}

export default VerifiedAccount;