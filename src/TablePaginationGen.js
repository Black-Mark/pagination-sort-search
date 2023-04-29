import "./App.css";
import React, { useState, useEffect } from 'react';
import Table from './Table';
import Pagination from './Pagination';

export default function TablePaginationGen({ data, pageSize = 5, pagesToShow = 5 }) {
    const [searchText, setSearchText] = useState('');
    const [searchColumn, setSearchColumn] = useState('Any');
    const [filteredData, setFilteredData] = useState([]);
    const [noDataFound, setNoDataFound] = useState(false);
    const dataHeaders = Object.keys(data[0] || {});
    const [sortSearch, setSortSearch] = useState('asc');
    const [isActiveSearch, setIsActiveSearch] = useState(false);

    useEffect(() => {
        if (isActiveSearch) {
            // Filter data based on search text and column
            const filteredData = data.filter((item) => {
                if (searchColumn === "Any") {
                    // Search all columns
                    return Object.values(item).some((value) =>
                        String(value).toLowerCase().includes(searchText.toLowerCase())
                    );
                } else {
                    // Search specific column
                    return String(item[searchColumn])
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                }
            });

            // Sort filtered data based on search column at ascending order
            if (searchText) {
                filteredData.sort((a, b) => {
                    const columnA = a[searchColumn];
                    const columnB = b[searchColumn];
                    if (columnA < columnB) {
                        return sortSearch === "asc" ? -1 : 1;
                    }
                    if (columnA > columnB) {
                        return sortSearch === "asc" ? 1 : -1;
                    }
                    return 0;
                });
            }

            // Update data state with filtered data or show "No Data Found"
            if (filteredData.length > 0) {
                setFilteredData(filteredData);
                setNoDataFound(false);
            } else {
                setFilteredData([]);
                setNoDataFound(true);
            }
        }
    }, [data, searchText, searchColumn, sortSearch, isActiveSearch]);


    const handleSearchButtonClick = () => {
        const filteredData = data.filter((item) => {
            if (searchColumn === "Any") {
                // Search all columns
                return Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(searchText.toLowerCase())
                );
            } else {
                // Search specific column
                return String(item[searchColumn])
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            }
        });

        // Sort filtered data based on search column at ascending order
        if (searchText) {
            filteredData.sort((a, b) => {
                const columnA = a[searchColumn];
                const columnB = b[searchColumn];
                if (columnA < columnB) {
                    return sortSearch === "asc" ? -1 : 1;
                }
                if (columnA > columnB) {
                    return sortSearch === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

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

    const handleSortSearch = e => {
        setSortSearch(e.target.value);
    }
    const handleIsActiveSearch = e => {
        setIsActiveSearch(prev => !prev);
    }

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
                    <select
                        value={sortSearch}
                        className="border ml-2 p-1"
                        onChange={handleSortSearch}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <button className="border ml-2 p-1" onClick={handleIsActiveSearch}>
                        {isActiveSearch ? 'Disable' : 'Enable'} Auto Search
                    </button>

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
