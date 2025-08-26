const Pagination = ({ currentPage, setCurrentPage, noOfPages }) => {
  const handlePagination = (n) => {
    setCurrentPage(n);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 0}
        className="pagination"
        onClick={handlePrevPage}
      >
        ⬅️
      </button>
      {[...Array(noOfPages).keys()].map((n) => (
        <button
          className={`pagination ${n === currentPage ? "activePage" : ""}`}
          onClick={() => handlePagination(n)}
        >
          {n}
        </button>
      ))}
      <button
        disabled={currentPage === noOfPages - 1}
        className="pagination"
        onClick={handleNextPage}
      >
        ➡️
      </button>
    </div>
  );
};

export default Pagination;
