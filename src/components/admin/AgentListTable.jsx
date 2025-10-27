import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import CustomPagination from '../admin/CustomPagination'
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import ExampleTrackChild from './ExampleTrackChild'
import { IoIosArrowDown } from "react-icons/io";

const columns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 50, maxWidth: 120,
    renderCell: (params) => {
      <a href='#'></a>
    }
   },
  { field: 'agency', headerName: 'Agency', flex: 1, minWidth: 120, maxWidth: 200,},
  { field: 'agent', headerName: 'Agent', flex: 0.8, minWidth: 100, maxWidth: 150 },
  { field: 'balance', headerName: 'Balance', flex: 0.6, minWidth: 90, maxWidth: 100 },
  { field: 'credit', headerName: 'Credit', flex: 0.6, minWidth: 90, maxWidth: 100 },
  { field: 'status', headerName: 'Status', flex: 0.8, minWidth: 90, maxWidth: 140,
    renderCell: (params)=> (
    <ExampleTrackChild />
    )
  },
  { 
 field: 'action', 
  headerName: 'Action', 
  flex: 1, 
  minWidth: 180, 
  renderCell: (params) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', gap: '10px', width:'100%' }}>
      <button className='flex items-center gap-1 rounded-md text-xs bg-[#15144E] text-white border-0 p-1.5 cursor-pointer'>
        Action<IoIosArrowDown className='text-[#fff]' />
      </button>
      <button className='flex items-center gap-1 rounded-md text-xs bg-white text-[#15144E] border border-[#15144E] p-1 cursor-pointer'>
        Finance<IoIosArrowDown className='text-[#15144E] ' />
      </button>
    </div>
  )
},

];

const rows = [
  { id: '1', agency: 'Talentmicro', agent: 'Akilamol joby', balance: ' 5,75,885', credit: ' 2,55,335', },
  { id: '2', agency: 'Marein Hospital', agent: 'Arun kumar Pushpangathan', balance: ' 2,55,335', credit: ' 2,55,335',},
  { id: '3', agency: 'Muhlbauer', agent: 'Mohammed ameen Maliyakal', balance: ' 2,50,000', credit: ' 2,55,335'},
  { id: '4', agency: 'Student', agent: 'Nebil Bava', balance: ' 2,55,335', credit: ' 55,200'},
  { id: '5', agency: 'Meleparambil', agent: 'Aswanth Mp', balance: ' 2,55,335', credit: ' 28,000'},
  { id: '6', agency: 'Muhlbauer', agent: 'Jumana Haseen', balance: ' 75,000', credit: ' 10,000'},
  { id: '7', agency: 'Talentmicro', agent: 'Sam', balance: '1,15,200', credit: '15,500'},
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  
  return (
      <div>
        <h1 className='text-xl font-semibold text-[#15144E] mb-6'>Agent List</h1>
          <div className='flex flex-col md:flex-row md:items-start justify-between gap-6'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-1/2">
              <button className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
                <span className='text-md font-normal'>Active</span>
                <span className='text-[#E5BC3B] text-lg font-bold'>8</span>
              </button>
              <button className="flex items-center justify-between px-4 py-3 bg-white text-[#15144E] rounded-lg shadow-sm">
                <span className='text-md font-normal'>In Active</span>
                <span className='text-[#E5BC3B] text-lg font-bold'>53</span>
              </button>
              <button className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg">
                <span className='text-md font-normal'>Balance</span>
                <span className='text-[#E5BC3B] text-lg font-bold'>0</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#15144E] text-[#fff] rounded-lg">
                <PiSlidersHorizontalFill size={18} />
                <span className='text-sm font-medium'>Filter</span>
              </button>
      
              <button className="flex items-center justify-center gap-2 bg-transparent border border-[#15144E] px-4 py-2 text-[#15144E] rounded-lg">
                <span className='text-sm font-medium'>Clear Filter</span>
              </button>
              <div>
              <button className="flex items-center justify-center py-2 text-[#15144E] rounded-lg">
                  <a href='' className='flex items-center gap-1'>
                    <CiExport size={18}/>
                    <span className='text-md capitalize'>export</span>
                  </a>
              </button>
             
              </div>
            </div>
          </div>
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
                pageSizeOptions={[6, 10]}
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
        </div>
  );
}

