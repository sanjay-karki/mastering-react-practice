import React, { useState } from "react";
// import { debounce } from "lodash";
import uuid from "react-uuid";
import DisplayTableAndPagination from "./DisplayTableAndPagination";
import useDebounce from "../../Hooks/useDebounce";

const PAGE_SIZE = 10;

function Table({ fetchInfo, handleDelete, handleEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = Math.ceil(fetchInfo.length / PAGE_SIZE) || 0;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  let visibleTableData = fetchInfo.slice(startIndex, endIndex);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const debouncedSearchQuery = useDebounce(handleSearchQuery, 300);

  if (searchQuery !== "") {
    let filteredVisibleTableData = fetchInfo.filter(({ name: { first, last } }) => {
      const fullName = `${first.toLowerCase()}${last.toLowerCase()}`;
      return first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        last.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fullName.includes(searchQuery.toLowerCase().split(" ").join(""));
    });
    visibleTableData = filteredVisibleTableData.slice(startIndex, endIndex);
    totalPages = Math.ceil(filteredVisibleTableData.length / PAGE_SIZE);
  }

  return (
    <>
      <h1>USER DETAILS</h1>
      <div className="user-filter-add-container">
        <label className="search-user">
          <span>Search User</span>
          <input
            onChange={debouncedSearchQuery}
            type="text"
            placeholder="Insert name here"
          />
        </label>
        <button className="add-user-btn" onClick={(e) => handleEdit(e, uuid())}>
          Add User
        </button>
      </div>
      <DisplayTableAndPagination
        visibleTableData={visibleTableData}
        startIndex={startIndex}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Table;
