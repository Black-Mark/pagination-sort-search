import "./App.css";
import React, { useState } from 'react';
import Table from './Table';
import Pagination from './Pagination';

export default function TablePaginationGen({ data , pageSize = 5 , pagesToShow = 5}) {
    //const [pageSize, setPageSize] = useState(pageSizeValue);  // number of items to show per page
    //const [pagesToShow, setPagesToShow] = useState(pageSizeValue); // number of page numbers to display in pagination
    const [searchText, setSearchText] = useState('');
    const [searchColumn, setSearchColumn] = useState('Any');
    const [filteredData, setFilteredData] = useState([]);
    const [noDataFound, setNoDataFound] = useState(false);
    const dataHeaders = Object.keys(data[0] || {});
    //const formattedHeaders = dataHeaders.map(header => header.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'));

    const handleSearchButtonClick = () => {
        // Filter data based on search text and column
        const filteredData = data.filter(item => {
            if (searchColumn === 'Any') {
                // Search all columns
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchText.toLowerCase())
                );
            } else {
                // Search specific column
                return String(item[searchColumn]).toLowerCase().includes(searchText.toLowerCase());
            }
        });

        // Update data state with filtered data or show "No Data Found"
        if (filteredData.length > 0) {
            setFilteredData(filteredData);
            setNoDataFound(false);
        } else {
            setFilteredData([]);
            setNoDataFound(true);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchColumnChange = e => {
        setSearchColumn(e.target.value);
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchInputChange}
                        className="border border-gray-400 p-2 mr-2"
                    />
                    <select
                        className="border ml-2 p-1"
                        value={searchColumn}
                        onChange={handleSearchColumnChange}
                    >
                        <option value="Any">Any</option>
                        {dataHeaders.map((dataHeader) => (
                            <option key={dataHeader} value={dataHeader}>
                                {dataHeader.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')}
                            </option>
                        ))}
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSearchButtonClick}
                    >
                        Search
                    </button>
                </div>
                <div className="container mx-auto px-4">
                    <Pagination
                        data={filteredData.length > 0 ? filteredData : data}
                        pageSize={pageSize}
                        pagesToShow={pagesToShow}
                        noDataFound={noDataFound}
                        renderTable={(currentData) => <Table data={currentData} noDataFound={noDataFound} />}
                    />
                </div>
            </div>
        </div>
    );
}