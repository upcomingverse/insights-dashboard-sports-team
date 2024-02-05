import React, { useState } from "react";

interface ExcelTableProps {
  data: string[][] | undefined;
  category: string;
}

const ExcelTable = ({ data, category }: ExcelTableProps) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || !data.length) {
    return null;
  }

  const transposedData = data;
  const headers = transposedData[0];
  const filteredRows = transposedData
    ?.slice(1)
    ?.filter((item) => item[0] === category);
  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visibleRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap border"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 font-semibold text-gray-700 bg-gray-200 border rounded"
        >
          Previous
        </button>
        <span className="mr-2 text-gray-700">{`${currentPage} / ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 font-semibold text-white bg-blue-500 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExcelTable;
