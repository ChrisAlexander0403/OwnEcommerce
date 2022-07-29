import React from 'react';
import { useQuery } from '@apollo/client';
import Products from '../../components/products/Products';
import GET_PHONES from '../../graphql/queries/GET_PHONES';
import { PhonesStoreStyles } from '../../styles/PhonesStyles';
import Filters from '../../components/filters/Filters';

const brand = [
    "Samsung",
    "Huawei",
    "Apple",
    "Lanix",
    "Alcatel",
    "Xiaomi"
];

const memory = [
    "1gb",
    "2gb",
    "3gb",
    "4gb",
    "8gb"
]

const storage = [
    "8gb",
    "16gb",
    "32gb",
    "64gb",
    "128gb",
    "256gb",
    "512gb"
]

const screen = [
    "HD",
    "FHD",
    "2K",
    "4K"
]

const PhonesStore = () => {

    const { loading, error, data, refetch } = useQuery(GET_PHONES);  

    return (
        <PhonesStoreStyles>
            <div className="filters">
                <p className="title">Filtros</p>
                <Filters category="Marca" filters={brand}/> 
                <Filters category="Memoria" filters={memory}/>
                <Filters category="Almacenamiento" filters={storage}/>
                <Filters category="Pantalla" filters={screen}/>
            </div>
            <div className="phones-container">
            {
                loading ? <p>Loading...</p> :
                <Products Data={data.getPhones.phones} />
            }
            </div>
        </PhonesStoreStyles>
    );
}

export default PhonesStore;