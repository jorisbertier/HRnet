import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Form from '../components/Form/Form'

function Home() {
    return (
        <div className="section-form">
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <Link to="/employeeList">View Current Employee !</Link>
            <h2>Create Employee</h2>
            <div className="form">
                <Form/>

            </div>
        </div>
    )
}

export default Home