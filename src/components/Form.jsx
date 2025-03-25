import React, { useState } from 'react'
import '../css/form.css'
import Modal from './Modal/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from 'date-fns/locale';
import { format } from "date-fns";


function Form() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    console.log(modalIsOpen)

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
                <a href="employee-list.html">View Current Employees</a>
                <h2>Create Employee</h2>
                <form action="#" className="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input id="date-of-birth" type="text" />

                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker selected={startDate} maxDate={new Date()} onChange={(date) => setStartDate(date)}  locale="fr" dateFormat="dd/MM/yyyy"/>

                    <fieldset className="address">
                        <legend className='title-address'>Address</legend>

                        <label htmlFor="street">Street</label><br></br>
                        <input className="street" type="text" /><br></br>

                        <label htmlFor="city">City</label><br></br>
                        <input className="city" type="text" /><br></br>

                        <label htmlFor="state">State</label><br></br>
                        <select name="state" className="state"></select><br></br>

                        <label htmlFor="zip-code">Zip Code</label><br></br>
                        <input className="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <select name="department" id="department">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
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