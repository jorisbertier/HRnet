import React, { useState } from 'react'
import '../css/form.css'
import Modal from './Modal/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from 'date-fns/locale';
import { format } from "date-fns";
import DropDown from './DropDown/DropDown';
import { Link } from 'react-router-dom';


function Form() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    console.log(format(startDate, "dd/MM/yyyy"))

    registerLocale("fr", fr);
    setDefaultLocale("fr");

    const handleSubmit = ()=> {
        setModalIsOpen(!modalIsOpen)
    }

    return (
        <div className="section-form">
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="form">
                <Link to="/employeeList">View Current Employee !</Link>
                <h2>Create Employee</h2>
                <form action="#" className="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker selected={dateOfBirth} showIcon maxDate={new Date()} onChange={(date) => setDateOfBirth(date)}  locale="fr" dateFormat="dd/MM/yyyy"/>

                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker selected={startDate} showIcon maxDate={new Date()} onChange={(date) => setStartDate(date)}  locale="fr" dateFormat="dd/MM/yyyy"/>

                    <fieldset className="address">
                        <legend className='title-address'>Address</legend>

                        <label htmlFor="street">Street</label><br></br>
                        <input className="street" type="text" /><br></br>

                        <label htmlFor="city">City</label><br></br>
                        <input className="city" type="text" /><br></br>

                        <label htmlFor="state">State</label><br></br>
                        <DropDown/><br></br>

                        <label htmlFor="zip-code">Zip Code</label><br></br>
                        <input className="zip-code" type="number" />
                    </fieldset><br></br>

                    <label htmlFor="department">Department</label><br></br>
                    <DropDown list={[
                        { name: "Sales" },
                        { name: "Marketing" },
                        { name: "Engineering" },
                        { name: "Human Resources" },
                        { name: "Legal" }
                    ]} title={'Choose a department'}/>
                </form><br></br>
                

                <button onClick={handleSubmit}>Save</button>
                {modalIsOpen &&
                <Modal closeModal={() => setModalIsOpen(false)}/>
                }
                </div>
                {/* <div id="confirmation" className="modal">Employee Created!</div> */}
            </div>
    )
}

export default Form