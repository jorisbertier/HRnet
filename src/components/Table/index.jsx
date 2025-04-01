import React, { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import './index.css'

const Table = () => {

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    
    console.log('pagination', pagination.pageIndex)
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    // const data = useMemo(
    //     () => [
    //     {firstName: "Alice",lastName: "Johnson",startDate: "2022-05-10",department: "Marketing",dateOfBirth: "1990-03-15",street: "123 Main St",city: "New York",state: "NY",zipCode: "10001",},
    //     {firstName: "Alice",lastName: "Johnson",startDate: "2022-05-10",department: "Marketing",dateOfBirth: "1990-03-15",street: "123 Main St",city: "New York",state: "NY",zipCode: "10001",},
    //     {firstName: "Alice",lastName: "Johnson",startDate: "2022-05-10",department: "Marketing",dateOfBirth: "1990-03-15",street: "123 Main St",city: "New York",state: "NY",zipCode: "10001",},
    //     {
    //         firstName: "Bob",
    //         lastName: "Smith",
    //         startDate: "2021-08-22",
    //         department: "Finance",
    //         dateOfBirth: "1985-07-19",
    //         street: "456 Elm St",
    //         city: "Los Angeles",
    //         state: "CA",
    //         zipCode: "90012",
    //     },
    //     {
    //         firstName: "Charlie",
    //         lastName: "Brown",
    //         startDate: "2023-02-17",
    //         department: "HR",
    //         dateOfBirth: "1995-12-05",
    //         street: "789 Oak St",
    //         city: "Chicago",
    //         state: "IL",
    //         zipCode: "60601",
    //     },
    // ])

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
        // state: {
        //     globalFilter: setSearch,
        // },
        // onGlobalFilterChange: setSearch, 
    });


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
            </tbody>
                {employees.length === 0 && <tr className="no-data">No Data Available</tr>}
            </table>
            <div className="pagination-container">
                <div>Showing 1 to 5 to 5 entries</div>
                <div className="pagination">
                    <button className="prev" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
                    <span className="numerotation">{pagination.pageIndex + 1}</span>
                    <button className="next" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Table;
