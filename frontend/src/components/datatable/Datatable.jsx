import React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { DatatableStyles } from './DatatableStyles';  
import { GlobalStyles, LinearProgress, Stack } from '@mui/material';
import CustomToolbar from './CustomToolbar';

const Datatable = ({ add, columns, isEmptyMessage, noFilterMessage, loading, rows = {}, refetch }) => {
  return (
    <DatatableStyles>
        <GlobalStyles
            styles={{
                '.MuiDataGrid-menuList': {
                    '& .MuiMenuItem-root': {
                        color: 'rgb(36, 0, 80)'
                    },
                    '& .MuiListItemIcon-root': {
                        color: 'rgb(36, 0, 80)'
                    }
                },
            }}
        />
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
            checkboxSelection
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{ 
                Toolbar: CustomToolbar, 
                LoadingOverlay: LinearProgress,
                NoRowsOverlay: () => (
                    <Stack height="100%" alignItems="center" justifyContent="center">
                        { isEmptyMessage ? isEmptyMessage : 'No rows in DataGrid' }
                    </Stack>
                ),
                NoResultsOverlay: () => (
                    <Stack height="100%" alignItems="center" justifyContent="center">
                        { noFilterMessage ? noFilterMessage : 'Local filter returns no result' }
                    </Stack>
                )
            }}
            componentsProps={{
                loadingOverlay: {
                    sx: {
                        "& .MuiLinearProgress-colorPrimary": {
                            background: "rgb(36, 0, 80)"
                        },
                        "& .MuiLinearProgress-barColorPrimary": {
                            background: "rgb(36, 0, 80)"
                        },
                    }
                },
                toolbar: {
                    sx: {
                        '& .MuiButton-root': {
                            color: 'rgb(36, 0, 80)'
                        },
                        '& .MuiButton-text': {
                            fontSize: '13px'
                        }
                    },
                    add,
                    refetch
                },
                panel: {
                    sx: {
                        '& .MuiTextField-root': {
                            '& label.Mui-focused': {
                                color: 'rgb(36, 0, 80)'
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'rgb(36, 0, 80)'
                            },
                        },
                        '& .MuiButton-text': {
                            color: 'rgb(36, 0, 80)'
                        },
                        '& .MuiSwitch-switchBase': {
                            color: 'rgb(228, 223, 246)',
                            '&.Mui-checked': {
                                color: 'rgb(36, 0, 80)',
                                '& + .MuiSwitch-track': {
                                    background: 'rgb(118, 96, 208)',
                                    opacity: 1
                                }
                            }
                        },
                        '& .MuiTypography-root': {
                            color: 'rgb(88, 88, 88)'
                        },
                        '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                                color: 'rgb(36, 0, 80)'
                            }
                        },
                        '& .MuiInput-underline::after': {
                            borderBottom: '2px solid rgb(36, 0, 80)'
                        },
                        '& .MuiInputBase-root': {
                            '&.Mui-focused': {
                                outlineColor: 'rgb(36, 0, 80)'
                            },
                        },
                    },
                  },
            }}
            loading={loading}
        />
    </DatatableStyles>
  );
}

export default Datatable;