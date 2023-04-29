import React, { useState, useMemo } from 'react';

function Table({ data, noDataFound }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const dataHeaders = Object.keys(data[0] || {});
  const formattedHeaders = dataHeaders.map(header => header.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'));

  const sortedData = useMemo(() => {
    const sortedArray = [...data];
    if (sortConfig.key) {
      sortedArray.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedArray;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          {dataHeaders.map((header, index) => (
            <th
              className="px-4 py-2 cursor-pointer"
              key={header}
              onClick={() => requestSort(header)}
            >
              {formattedHeaders[index]}
              {sortConfig.key === header && (
                <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      {!noDataFound ? (
        <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {dataHeaders.map((header) => {
              const cellData = typeof item[header] === 'boolean' ? item[header].toString() : item[header];
              return (
                <td className="border px-4 py-2" key={header}>
                  {cellData}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
      ) : (
        <tbody>
          <tr>
            <td colSpan={dataHeaders.length} className="text-center py-4">
              No Data Found
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}

export default Table;