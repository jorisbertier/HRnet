import React, { useState } from 'react'
import './form.css'
import Modal from 'hrnet-plugin-modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from 'date-fns/locale';
import { format } from "date-fns";
import DropDown from '../DropDown/DropDown';
import States from '../../datas/states.json'
import Department from '../../datas/department.json'
import { useEmployees } from '../../context/EmployeeContext';

function Form() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [selectedState, setSelectedState] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [errorMessage, setErrorMessage] = useState(false)

    registerLocale("fr", fr);
    setDefaultLocale("fr");

    const { addEmployee } = useEmployees();

    const handleSubmit = (event)=> {
        event.preventDefault()

        if(firstName.length < 2 || lastName.length <2 || city.length <2 || street.length <2 || zipCode.length < 2 || selectedState === '' || selectedDepartment === '') {
            setErrorMessage(true)
            return;
        }

        setErrorMessage(false)
        const employee = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: format(dateOfBirth, "dd/MM/yyyy"),
            startDate: format(startDate, "dd/MM/yyyy"),
            department: selectedDepartment,
            street: street,
            city: city,
            state: selectedState,
            zipCode: zipCode
        };
        addEmployee(employee)
        setModalIsOpen(true)
        resetForm()
    }

    const handleSelectedState = (newState) => {
        setSelectedState(newState);
    };

    const handleSelectedDepartment = (newDepartment) => {
        setSelectedDepartment(newDepartment);
    };
    const resetForm = () => {
        console.log('reste from')
        setFirstName('');
        setLastName('');
        setDateOfBirth(new Date());
        setStartDate(new Date());
        setStreet('');
        setCity('');
        setZipCode('');
        setSelectedState('Choisir un état');
        setSelectedDepartment('Choisir un département');
    }

    return (
        <>
            <form action="#"  onSubmit={handleSubmit} className="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" value={firstName} id="first-name" onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" value={lastName} id="last-name" onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker id="date-of-birth" selected={dateOfBirth} showIcon maxDate={new Date()} onChange={(date) => setDateOfBirth(date)}  locale="fr" dateFormat="dd/MM/yyyy"/>

                <label htmlFor="start-date">Start Date</label>
                <DatePicker id="start-date" selected={startDate} showIcon maxDate={new Date()} onChange={(date) => setStartDate(date)}  locale="fr" dateFormat="dd/MM/yyyy"/>

                <fieldset className="address">
                    <legend className='title-address'>Address</legend>

                    <label htmlFor="street">Street</label><br></br>
                    <input id="street" value={street} className="street" type="text" onChange={(e) => setStreet(e.target.value)} /><br></br>

                    <label htmlFor="city">City</label><br></br>
                    <input id="city" value={city} className="city" type="text" onChange={(e) => setCity(e.target.value)} /><br></br>

                    <label htmlFor="state">State</label><br></br>
                    <DropDown id="state" value={selectedState} data={States} title={'Choisir un état'} getData={handleSelectedState}/><br></br>

                    <label htmlFor="zip-code">Zip Code</label><br></br>
                    <input id="zip-code" value={zipCode} className="zip-code" type="number" onChange={(e) => setZipCode(e.target.value)}  />
                </fieldset><br></br>

                <label htmlFor="department">Department</label><br></br>
                <DropDown data={Department} value={selectedDepartment} title={'Choisir un département'} getData={handleSelectedDepartment}/><br></br><br></br>
            {errorMessage && <span className='error'>Veuillez remplir correctement les champs du formulaire ! </span>}<br></br>
            <button type="submit" className="button">Save</button>
            </form><br></br>
            
            <br></br>

            {/* <button onClick={()=>  setModalIsOpen(true)} className="button">ouvrir</button> */}
            {modalIsOpen &&
            <Modal closeModal={() => setModalIsOpen(false)} text={'Employee Created !'}/>
            }
        </>
    )
}

export default Form