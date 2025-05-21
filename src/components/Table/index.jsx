import React, { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import './index.css'
import { useEmployees } from "../../context/EmployeeContext";

const Table = () => {

    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState([])

    const { employees } = useEmployees()

    const columns = useMemo(
        () => [
            { accessorKey: "firstName", header: "First Name" },
            { accessorKey: "lastName", header: "Last Name" },
            { accessorKey: "startDate", header: "Start Date" },
            { accessorKey: "department", header: "Department" },
            { accessorKey: "dateOfBirth", header: "Date of Birth" },
            { accessorKey: "street", header: "Street" },
            { accessorKey: "city", header: "City" },
            { accessorKey: "state", header: "State" },
            { accessorKey: "zipCode", header: "Zip Code" },
        ],
        []
    );

    const filteredData = useMemo(() => {
        return employees.filter(employee => 
            Object.values(employee).some(value =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        )      
    }, [employees, search]);

    //config table
    const table = useReactTable({
        data : filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            pagination,
            sorting
        },
    });


    const currentPage = table.getState().pagination.pageIndex + 1;
    const rowsPerPage = Math.min(currentPage * pagination.pageSize, filteredData.length);
    const rowsPerPageInitial = pagination.pageIndex * pagination.pageSize + 1;
    const pageCount = table.getPageCount();

    const pageNumbers = Array.from(
        { length: pageCount},
        (_, i) => i + 1
    );

    return (
        <div className="table-container">
            <div className="table-controls">
                <div className="table-title">
                    <label>Show
                        <select
                            className="bloc-show"
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                        entries
                    </label>
                </div>
                <div className="search-box">
                    <label>Search:</label>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            <div className="header-cell">
                                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                <span className="sort-icons">
                                    <span>
                                        <svg className={`arrow up ${header.column.getIsSorted() === 'asc' ? 'active' : header.column.getIsSorted() === 'desc' ? 'inactive' : ''}`} height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M490,474.459H0L245.009,15.541L490,474.459z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                                    </span>
                                    <span>
                                        <svg className={`arrow down ${header.column.getIsSorted() === 'desc' ? 'active' : header.column.getIsSorted() === 'asc' ? 'inactive' : ''}`} height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M490,474.459H0L245.009,15.541L490,474.459z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                                    </span>
                                </span>
                            </div>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={cell.column.id === "firstName" ? "sorting_1" : ""}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                    ))}
                </tr>
                ))}
            {employees.length === 0 && (
                <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: "1rem" }}>
                    No Data Available
                </td>
                </tr>
                )}
            </tbody>
            </table>
            <div className="pagination-container">
                <div>Showing {rowsPerPageInitial} to {rowsPerPage} of {filteredData.length} entries</div>
                <div className="pagination">
                    {table.getCanPreviousPage() && (
                        <button className="prev" onClick={() => table.previousPage()}>Prev</button>
                    )}
                    {pageNumbers.map((num) => (
                        <span
                            key={num}
                            className={`numerotation ${num === currentPage ? 'active' : 'inactive'}`}
                            onClick={() => table.setPageIndex(num - 1)}
                        >
                            {num}
                        </span>

                    ))}
                    {table.getCanNextPage() && (
                        <button className="next" onClick={() => table.nextPage()}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;
