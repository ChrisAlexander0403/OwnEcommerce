import React, { useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Datatable from '../components/datatable/Datatable';
import GET_CLIENTS from '../graphql/queries/GET_CLIENTS';
import useImage from '../hooks/useImage';
import { CustomersStyles } from '../styles/CustomersStyles';

const Customers = () => {

  const [rows, setRows] = useState({});

  const { loading, error, data, refetch } = useQuery(GET_CLIENTS);

  const verifyImage = useImage();

  const navigate = useNavigate();

  const handleDetails = (e, id) => {
    e.stopPropagation();
    navigate(id.toString());
  }

  const handleDelete = (e, id) => {
    e.stopPropagation();  
  }

  const columns = [
    { 
      field: 'profilePicture', 
      headerName: 'Perfil', 
      width: 80 ,
      renderCell: (params) => {
        if (verifyImage(`assets/img/${params.profilePicture}`).exists) {
          return (
            <div className="cell-with-img">
              <img src={`assets/img/${params.profilePicture}`} alt="Profile" />
            </div>
          );
        }
        return (
          <div className="avatar">
            <BsFillPersonFill />
          </div>
        )
      }
    },
    { field: 'firstname', headerName: 'Nombre', width: 140 },
    { field: 'lastname', headerName: 'Apellido', width: 140 },
    { field: 'email', headerName: 'Correo', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    }
  ];

  const actionColumn = [{
    field: 'options',
    headerName: 'Opciones',
    width: 170,
    renderCell: (params) => {
      return(
        <div className="cellAction">
          <button className="view" onClick={(e) => handleDetails(e, params.row._id)}>Detalles</button>
          {/* <button className="edit"></button> */}
          <button className="delete" onClick={(e) => handleDelete(e, params.row._id)}>Eliminar</button>
        </div>
      )
    }
  }];

  useEffect(() => {
    if (!loading) {
      setRows(data && data.getClients.clients);
    }
  }, [data, loading]);
  
  
  return (
    <CustomersStyles>
      <div className="list-container">
        <Datatable 
          columns={columns.concat(actionColumn)} 
          loading={loading}
          isEmptyMessage="No se encontraron clientes"
          noFilterMessage="No hay resultados para el filtro"
          rows={rows} 
          refetch={refetch} 
        />
      </div>
    </CustomersStyles>
  );
}

export default Customers;