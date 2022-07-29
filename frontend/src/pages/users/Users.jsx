import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { Delete, Preview } from '@mui/icons-material';
import Datatable from '../../components/datatable/Datatable';
import useImage from '../../hooks/useImage';
import { UsersStyles } from '../../styles/UsersStyles';
import Modal from '../../components/modal/Modal';
import useModal from '../../hooks/useModal';
import GET_USERS from '../../graphql/queries/GET_USERS';
import { useMutation, useQuery } from '@apollo/client';
import DELETE_USER from '../../graphql/mutations/DELETE_USER';

const Users = () => {
    const [rows, setRows] = useState({});
    const [deliting, setDeliting] = useState();

    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [deleteUser, { loading: loadingDelete, error: errorDelete, data: dataDelete }] = useMutation(DELETE_USER);

    const verifyImage = useImage();

    const navigate = useNavigate();

    const [ isOpen, openModal, closeModal ] = useModal(false);

    const handleDetails = (e, id) => {
        id = id.toString();
        e.stopPropagation();
        navigate(`details/${id}`);
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        setDeliting(id);
        openModal();
    }

    const confirmDeleteUser = () => {
        deleteUser({
            variables: {
                _id: deliting
            }
        });

        if (dataDelete) {
            if (dataDelete.deleteUser.status === 200) {
                closeModal();
            }
        }
    }

    const columns = [
        { 
            field: 'profilePicture', 
            headerName: 'Perfil', 
            width: 100 ,
            renderCell: (params) => {
                if (verifyImage(`assets/img/${params}`).exists) {
                return (
                    <div className="cell-with-img">
                    <img src={`assets/img/${params}`} alt="Profile" />
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
        { field: 'firstname', headerName: 'Nombre', width: 130 },
        { field: 'lastname', headerName: 'Apellido', width: 130 },
        { field: 'email', headerName: 'Correo', width: 130 },
        { field: 'rol', headerName: 'Rol', width: 90 },
        { field: 'status', headerName: 'Status', width: 90 },
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

    useEffect(() => {
        if (!loading) {
          setRows(data && data.getUsers.users);
        }
    }, [data, loading]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <UsersStyles>
            <div className="list-container">
                <Datatable 
                    add 
                    columns={columns.concat(actionColumn)} 
                    loading={loading}
                    isEmptyMessage="No se encontraron usuarios"
                    noFilterMessage="No hay resultados para el filtro"
                    refetch={refetch}
                    rows={rows} 
                />
            </div>
            <Modal 
                isOpen={isOpen} closeModal={closeModal} minWidth="400px" minHeight="530px"
                type="cancel" color="gray"
            >
                <div className="deliting-container">
                    <p>¿Seguro que deseas eliminar a este usuario? Esta acción es permanente.</p>
                    <div className="buttons">
                        <button className="confirm" onClick={confirmDeleteUser}>Confirmar</button>
                        <button className="cancel" onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        </UsersStyles>
    );
}

export default Users;