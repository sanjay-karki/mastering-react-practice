import React from 'react'
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";


const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="pagination-container">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((page) => page - 1)}
    >
      <FiArrowLeft />
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((page) => page + 1)}
    >
      <FiArrowRight />
    </button>
  </div>
  )
}

export default Pagination