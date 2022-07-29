import React from 'react';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { NewButton } from './DatatableStyles';
import { Add, Refresh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CustomToolbar = ({ add, refetch }) => {

    const navigate = useNavigate();

  return (
    <GridToolbarContainer 
        sx={{
            '& .MuiButton-root': {
                color: 'rgb(36, 0, 80)',

                '&:hover': {
                    background: 'rgb(228, 223, 233)'
                }
            }
        }}
    >
        <NewButton onClick={() => refetch()}><Refresh className='icon'/> REFRESH</NewButton>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        { add && <NewButton onClick={() => navigate('add')}><Add className="icon"/> AGREGAR</NewButton> }
    </GridToolbarContainer>
  );
}

export default CustomToolbar;