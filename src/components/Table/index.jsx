import React, { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import './index.css'
import { useEmployees } from "../../context/EmployeeContext";

const Table = () => {

    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

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

    const table = useReactTable({
        data : filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    const currentPage = pagination.pageIndex + 1;
    const rowsPerPage = Math.min((pagination.pageIndex + 1) *pagination.pageSize, filteredData.length);
    const rowsPerPageInitial = (pagination.pageIndex * pagination.pageSize) + 1;
    return (
        <div className="table-container">
            <div className="table-controls">
                <div className="table-title">
                    <label>Show
                                        <select
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
                        <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
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
                    {!currentPage === 1 &&
                    <button className="prev" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
                    }
                    <span className="numerotation">{currentPage}</span>
                    <button className="next" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Table;
