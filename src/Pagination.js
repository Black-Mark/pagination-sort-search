import React, { useState, useMemo } from 'react';

function Pagination({ data, pageSize = 5, pagesToShow = 5, noDataFound, renderTable }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

    const currentData = useMemo(() => {
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [data, indexOfFirstItem, indexOfLastItem]);

    const totalPages = Math.ceil(data.length / pageSize);

    const handleFirstPageClick = () => {
        setCurrentPage(1);
    };

    const handleLastPageClick = () => {
        setCurrentPage(totalPages);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPageNumbers = useMemo(() => {
        const pageNumbers = [];
        const halfPageToShow = Math.floor(pagesToShow / 2);

        let startPage = Math.max(1, currentPage - halfPageToShow);
        let endPage = Math.min(totalPages, currentPage + halfPageToShow);

        if (endPage - startPage + 1 < pagesToShow) {
            if (currentPage <= halfPageToShow) {
                endPage = Math.min(startPage + pagesToShow - 1, totalPages);
            } else {
                startPage = Math.max(endPage - pagesToShow + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    }, [currentPage, totalPages]);

    return (
        <div className="w-full flex flex-col items-center">
            {renderTable(currentData)}

            {!noDataFound && (
                <div className="flex mt-4">
                    <button
                        className={`px-4 py-2 rounded-l ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={handleFirstPageClick}
                        disabled={currentPage === 1}
                    >
                        First
                    </button>

                    {currentPage > pagesToShow / 2 + 1 && (
                        <span className="px-4 py-2">...</span>
                    )}

                    <button
                        className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={handlePrevClick}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {getPageNumbers.map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 ${page === currentPage ? 'bg-gray-400 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={handleNextClick}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>

                    {currentPage <= totalPages - pagesToShow / 2 && (
                        <span className="px-4 py-2">...</span>
                    )}

                    <button
                        className={`px-4 py-2 rounded-r ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={handleLastPageClick}
                        disabled={currentPage === totalPages}
                    >
                        Last
                    </button>
                </div>
            )}
        </div>
    );



}

export default Pagination;
