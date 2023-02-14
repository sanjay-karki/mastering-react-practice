import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from "./Pagination";

const DisplayTable = ({
  visibleTableData,
  startIndex,
  handleDelete,
  handleEdit,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <>
      {visibleTableData.length === 0 ? (
        <div className="no-data">Data not found.</div>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                {[
                  "No.",
                  "Name",
                  "Gender",
                  "Country",
                  "Email",
                  "Phone",
                  "Action",
                ].map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
              {visibleTableData.map((info, index) => (
                <tr key={info.login.uuid}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    {info.name.first} {info.name.last}
                  </td>
                  <td>
                    {info.gender.charAt(0).toUpperCase() + info.gender.slice(1)}
                  </td>
                  <td>{info.location.country}</td>
                  <td>{info.email}</td>
                  <td>{info.phone}</td>
                  <td>
                    <button
                      className="action-icon trash-icon"
                      onClick={(e) => handleDelete(e, info.login.uuid)}
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      className="action-icon edit-icon"
                      onClick={(e) => handleEdit(e, info.login.uuid)}
                    >
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default DisplayTable;
