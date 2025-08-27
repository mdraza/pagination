import React from "react";

const Pagination1 = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePagination = (n) => {
    setCurrentPage(n);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 0}
        className="pagination"
        onClick={handlePrev}
      >
        ⬅️
      </button>
      {[...Array(totalPages).keys()].map((n) => (
        <button
          key={n}
          className={`pagination ${n == currentPage ? "activePage" : ""}`}
          onClick={() => handlePagination(n)}
        >
          {n + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages - 1}
        className="pagination"
        onClick={handleNext}
      >
        ➡️
      </button>
    </div>
  );
};

export default Pagination1;
