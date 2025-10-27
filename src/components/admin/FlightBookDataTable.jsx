import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomPagination from '../admin/CustomPagination'

const columns = [
  { field: 'id', headerName: 'Booking ID', flex: 1, minWidth: 100, maxWidth: 160 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 120, maxWidth: 200,},
  { field: 'flight_no', headerName: 'Flight No.', flex: 0.8, minWidth: 100, maxWidth: 150 },
  { field: 'from', headerName: 'From', flex: 0.6, minWidth: 85, maxWidth: 100 },
  { field: 'to', headerName: 'To', flex: 0.6, minWidth: 85, maxWidth: 100 },
  { field: 'departure', headerName: 'Departure', flex: 1.2, minWidth: 140, maxWidth: 180 },
  { field: 'arrival', headerName: 'Arrival', flex: 1.2, minWidth: 140, maxWidth: 180 },
  { field: 'status', headerName: 'Status', flex: 0.8, minWidth: 90, maxWidth: 140,
   
    renderCell: (params) => {
      const status = params.value?.toLowerCase();
        let textColor = '#000';
        let bgColor = '#EFEFEF';

        if (status === 'confirmed') { textColor = '#32C900'; bgColor = '#E8FFE3';}
        else if (status === 'cancelled') {textColor = '#FF2020'; bgColor = '#FFECEC';}
        else if (status === 'pending') {textColor = '#FCBE00'; bgColor = '#FFF6DA';}

      return (
        <div
          style={{
            color: textColor,
            backgroundColor: bgColor,
            minWidth: '80px',
            height: '35px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'normal',
            fontSize: '12px',
            textTransform: 'capitalize',
            boxSizing: 'border-box',
          }}
        >
          {params.value}
        </div>
      );
    },
  },
  { field: 'actions', headerName: '', flex: 0.2, minWidth: 40, sortable: false,
    renderCell: (params) => (
      <IconButton onClick={() => console.log(`Action clicked for row: ${params.row.id}`)} size="small" >
        <BsThreeDotsVertical style={{ fontSize: '14px', color: '#B3B3B3' }} />
      </IconButton>
    ),
  },
];

const rows = [
  { id: 'AO25226310', name: 'Sadhik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Confirmed' },
  { id: 'AO25226311', name: 'Mohammed Sadik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Pending' },
  { id: 'AO25226312', name: 'Mohammed Sadik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Cancelled' },
  { id: 'AO25226313', name: 'Mohammed Sadik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Confirmed' },
  { id: 'AO25226314', name: 'Mohammed Sadik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Confirmed' },
  { id: 'AO25226315', name: 'Mohammed Sadik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Confirmed' },
  { id: 'AO25226316', name: 'Mohammed Sadik', flight_no: 'G9 - 606', from: 'WAW', to: 'COK', departure: '27-10-2025, 08:55', arrival: '28-10-2025, 06:40', status: 'Cancelled' },
];

const paginationModel = { page: 0, pageSize: 6 };

export default function DataTable() {
  
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Paper
        sx={{
          width: '100%',
          mx: 'auto',
          overflowX: 'hidden',
          '@media (max-width: 768px)': {
            minWidth: '700px',
          },
        }}
      >
      <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnMenu
         slots={{
            pagination: CustomPagination,
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeader--sortable .MuiDataGrid-sortIcon': {
              display: 'none',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textTransform: 'capitalize',
              fontWeight: 'bold',
              padding:'20px 0',
              color: '#15144E',
            },
            '& .MuiDataGrid-cell': {
              textTransform: 'capitalize',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              
              justifyContent: 'flex-start',
              padding: '6px 8px',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              lineHeight: '1.4',
            },
            '& .MuiDataGrid-row': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none !important',
            },
            '& .MuiCheckbox-root svg': {
              width: '18px',
              height: '18px',
            },
          }}
          autoHeight
        />

      </Paper>
    </div>
  );
}
