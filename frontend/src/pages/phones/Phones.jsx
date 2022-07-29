import { useQuery } from '@apollo/client';
import { Delete, Preview } from '@mui/icons-material';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import GET_PHONES from '../../graphql/queries/GET_PHONES';
import { PhonesStyles } from '../../styles/PhonesStyles';

const Phones = () => {

  const [rows, setRows] = useState({});
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

  const { loading, error, data, refetch } = useQuery(GET_PHONES);

  const handleDetails = (e, id) => {
    e.stopPropagation();
    navigate(id);
  }

  const handleDelete = (e, id) => {
    e.stopPropagation();  
  }

  useEffect(() => {
    if (!loading) {
      setRows(data && data.getPhones.phones);
    }
  }, [data, loading]);

  useEffect(() => {
    refetch()
  }, []);
  

  return (
    <>
    <Helmet>
      <title>Intecel Admin - Celulares</title>
    </Helmet>
    <PhonesStyles>
      <div className="list-container">
        <Datatable 
          add 
          columns={columns.concat(actionColumn)} 
          loading={loading} 
          isEmptyMessage="No se encontraron celulares"
          noFilterMessage="No hay resultados para el filtro"
          refetch={refetch}
          rows={rows}  
        />
      </div>
    </PhonesStyles>
    </>
  );
}

export default Phones;