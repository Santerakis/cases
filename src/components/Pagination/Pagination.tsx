import React, { ChangeEvent } from "react";
import "./pagination.scss";

type Pagination = {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export const Pagination = ({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: Pagination) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
    onPageChange(1); // Reset to the first page whenever items per page change
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`page-number ${currentPage === i ? "active" : ""}`}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>,
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          className={`page-number ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          1
        </button>,
      );

      let startPage = Math.max(2, currentPage - 3);
      let endPage = Math.min(totalPages - 1, currentPage + 3);

      if (currentPage <= 4) {
        startPage = 2;
        endPage = 8;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 7;
        endPage = totalPages - 1;
      }

      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-dots" className="dots">
            ..
          </span>,
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`page-number ${currentPage === i ? "active" : ""}`}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>,
        );
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-dots" className="dots">
            ..
          </span>,
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`page-number ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        className="nav-button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {/*&larr; Предыдущие*/}
        &laquo;
      </button>
      {renderPageNumbers()}
      <button
        className="nav-button"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {/*Следующие &rarr;*/}
        &raquo;
      </button>
      <select
        className="items-per-page-select"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};
