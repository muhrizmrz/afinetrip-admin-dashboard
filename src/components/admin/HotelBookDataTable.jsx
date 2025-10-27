import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { BsThreeDotsVertical } from "react-icons/bs";

const columns = [
  { field: 'id', headerName: 'Hotel Name', flex: 1 },
  { field: 'rating', headerName: 'Rating',renderCell: (params) => (
      <span style={{ color: '#FCBE00' }}>
        {'★'.repeat(params.value)}{' '}
        {'☆'.repeat(5 - params.value)}
      </span>
    ),
  },
  { field: 'location', headerName: 'Location', flex: 1 },
  { field: 'price_night', headerName: 'Price/Night', flex: 1 },
  { field: 'amneties', headerName: 'Amneties', flex: 1 },
  { field: 'review', headerName: 'Review', flex: 1 },
  { field: 'distance_from_airport', headerName: 'Distance From Airport',flex: 1,},
  {field: 'status', headerName: 'Status',flex: 1,
    renderCell: (params) => {
      const status = params.value?.toLowerCase();
      let textColor = '#fff';

      if (status === 'confirmed') textColor  = '#32C900';
      else if (status === 'cancel')  textColor  = '#FF2020';
      else if (status === 'pending')  textColor  = '#FCBE00';

      return (
        <div
          style={{   
            color: textColor,
            minWidth: '90px',  
            height: '35px',  
            borderRadius: '9999px', // pill shape
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#fff',
            fontWeight: '600',
            fontSize: '12px',
            textTransform: 'capitalize',
            padding: '5 12px', 
            boxSizing: 'border-box',
            border:'1px solid #EFEFEF'
          }}
        >
          {params.value}
        </div>
      );
    },
  },
      {field: 'actions', headerName: '',
    width: '10', sortable: false,
    renderCell: (params) => (
      <IconButton onClick={() => {
          // Add your action handler here
          console.log(`Action clicked for row: ${params.row.id}`);
        }}
        size="small"
         sx={{padding: '0px',  minWidth: 'auto',  
      }}
      >
        <BsThreeDotsVertical style={{fontSize: '14px', color: '#B3B3B3'}}/>
      </IconButton>
    ),
  },
];

const rows = [
  { id: 'Radisson Blu Plaza Hotel', rating: 4, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'Confirmed' },
  { id: 'Address Sky View', rating: 3, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'Confirmed' },
  { id: 'Public Hotel NIC', rating: 2, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'cancel' },
  { id: 'Hotel Bristol', rating: 5, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'Confirmed' },
  { id: 'Delta Hotel Saint John', rating: 3, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'cancel' },
  { id: 'Fairmont Banff Springs', rating: 3, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'Confirmed' },
  { id: 'Viswaratna Hotel', rating: 5, location: 'Dubai', price_night: '8,500', amneties: 'WiFi, breakfast', review: '4.5', distance_from_airport: '12 km', status: 'Pending' },
];


const paginationModel = { page: 0, pageSize: 6 };

export default function DataTable() {
  return (
    <Paper sx={{ height: '100%', width: '100%', }} >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-columnHeader--sortable .MuiDataGrid-sortIcon': {
            display:'none'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
              textTransform: 'capitalize',
              fontWeight: 'bold',
              color: '#15144E',
            },
          '& .MuiCheckbox-root svg': {
            width: '20px',
            height: '20px',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none !important',
          },
           
          '& .MuiDataGrid-columnHeader': {
            padding: '8px',
          },

          // ✅ Cell styling
          '& .MuiDataGrid-cell': {
            textTransform:'capitalize',
            maxWidth: '150px !important',
            whiteSpace: 'normal !important',
            wordBreak: 'break-word',
            alignItems: 'center !important',
            display: 'flex',
            justifyContent: 'flex-start !important',
            textAlign: 'left',
            lineHeight: '1.5',
            padding: '8px',
          },

          '& .MuiDataGrid-cell[data-field="id"]': {
            color: '#15144E',
            fontSize: 12,
            fontWeight: 800,
          },

          '& .MuiDataGrid-row': {
            color: '#6E6E6E',
            fontSize: 12,
            fontWeight: 400,
          },
        border: 0,
      }}
    />

    </Paper>
  );
}
