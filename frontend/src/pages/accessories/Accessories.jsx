import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import { Delete, Preview } from '@mui/icons-material';
import { AccessoriesStyles } from '../../styles/AccessoriesStyles';
import Datatable from '../../components/datatable/Datatable';
import GET_ACCESSORIES from '../../graphql/queries/GET_ACCESSORIES';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Accessories = () => {

    const [rows, setRows] = useState([]);
    const { loading, error, data, refetch } = useQuery(GET_ACCESSORIES);
    const navigate = useNavigate();

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            width: 70,
            hide: true
        },
        {
            field: 'sku',
            headerName: 'SKU',
            width: 110
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 200
        },
        {
            field: 'brand',
            headerName: 'Marca',
            width: 150
        },
        {
            field: 'price',
            headerName: 'Precio',
            width: 110,
            renderCell: (params) => {
                return (
                    <span>{numeral(params.row.price - (params.row.price * params.row.discount) / 100).format("$0,0.00")}</span>
                )
            }
        },
        {
            field: 'discount',
            headerName: 'Descuento',
            width: 100,
            renderCell: (params) => {
                return (
                    <span>{params.row.discount === 0 ? 'N/A' : params.row.discount.toString().concat('%')}</span>
                )
            }
        },
        {
            field: 'inStock',
            headerName: 'Disponibles',
            type: 'number',
            width: 100
        }
    ];

    const actionColumn = [{
        field: 'options',
        headerName: 'Opciones',
        width: 170,
        renderCell: (params) => {
            return(
                <div className="cellAction">
                <button className="view" onClick={(e) => handleDetails(e, params.row._id)}><Preview className='icon' /></button>
                {/* <button className="edit"></button> */}
                <button className="delete" onClick={(e) => handleDelete(e, params.row._id)}><Delete className='icon' /></button>
                </div>
            )
        }
    }];

    // const rows = [
    //     { _id: '1', sku: '00000001', name: "Headphones", branch: "Sony", price: 1500, discount: 30, inStock: 4 },
    //     { _id: '2', sku: '00000002', name: "Case", branch: "Apple", price: 350, discount: 0, inStock: 10 },
    //     { _id: '3', sku: '00000003', name: "Charger", branch: "Samsung", price: 200, discount: 10, inStock: 25 },
    //     { _id: '4', sku: '00000004', name: "Car support", branch: "Mobo", price: 150, discount: 0, inStock: 4 }
    // ];

    const handleDetails = (e, id) => {
        e.stopPropagation();
        navigate(id);
      }
    
    const handleDelete = (e, id) => {
        e.stopPropagation();  
    }

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        console.log(error)
        if (!loading) {
          setRows(data && data.getAccessories.accessories);
        }
    }, [data, loading]);

    return (
        <AccessoriesStyles>
            <div className="list-container">
                <Datatable 
                    add 
                    columns={columns.concat(actionColumn)}
                    isEmptyMessage="No se encontraron accesorios"
                    noFilterMessage="No hay resultados para el filtro"
                    loading={loading} 
                    refetch={refetch}
                    rows={rows} 
                />
            </div>
        </AccessoriesStyles>
    );
}

export default Accessories;