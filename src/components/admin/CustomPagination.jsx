import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector } from '@mui/x-data-grid';
import { Pagination, PaginationItem } from '@mui/material';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handlePageChange = (event, value) => {
    apiRef.current.setPage(value - 1);
  };

  const renderNavigationIcon = (type) => {
    const isPrevious = type === 'previous';
    
    return (
      <span style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px',
        flexDirection: isPrevious ? 'row-reverse' : 'row'
      }}>
        {isPrevious ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
        <span>{isPrevious ? 'Previous' : 'Next'}</span>
      </span>
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '16px',
      width: '100%' 
    }}>
      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={handlePageChange}
        siblingCount={1}
        boundaryCount={0}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: () => renderNavigationIcon('previous'),
              next: () => renderNavigationIcon('next'),
            }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default CustomPagination;