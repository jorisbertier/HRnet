import React from 'react'
import Table from '../components/Table'
import { Link } from 'react-router-dom'


function EmployeeList() {


    return (
        <div>
            <Link to="/">
                <div style={ {textAlign: 'left', padding: '8px 16px', marginLeft: '10%'}}>
                    <svg fill="#000000" version="1.1" id="Capa_1" width={20} height={20} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 595.513 595.513" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M592.403,232.481c-2.068-2.075-4.712-3.097-7.925-3.097H154.389v-52.968c0-4.59-2.185-7.932-6.548-9.988 c-4.364-1.83-8.391-1.144-12.062,2.062L3.445,290.486C1.15,292.788,0,295.548,0,298.755c0,3.005,1.15,5.643,3.445,7.932 l132.339,120.619c3.672,2.986,7.693,3.567,12.062,1.726c4.364-1.83,6.548-5.172,6.548-9.988v-46.909h430.089 c3.213,0,5.856-1.034,7.926-3.097c2.068-2.075,3.103-4.713,3.103-7.932V240.407C595.5,237.193,594.466,234.556,592.403,232.481z"></path> </g> </g> </g></svg>
                </div>
            </Link>
            <h1 style={{fontWeight: 'bold'}}>Current Employees</h1>
            <Table/>
        </div>
    )
}

export default EmployeeList