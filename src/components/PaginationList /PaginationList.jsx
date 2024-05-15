import { Pagination } from "@mui/material";

const PaginationList = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };
  return (
    <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
  );
};

export default PaginationList;
