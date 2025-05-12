import React, { useState } from 'react'
import './form.css'
import Modal from 'hrnet-plugin-modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from 'date-fns/locale';
import { format, subYears } from "date-fns";
import DropDown from '../DropDown/DropDown';
import States from '../../datas/states.json'
import Department from '../../datas/department.json'
import { useEmployees } from '../../context/EmployeeContext';
import { capitalize } from '../../utils/utils';

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
    const [errorMessage, setErrorMessage] =  useState({});
    
    registerLocale("fr", fr);
    setDefaultLocale("fr");

    const { addEmployee } = useEmployees();

    const validate = () => {
        const newErrors = {};

        if (lastName.trim().length < 2) {
            newErrors.lastName = 'Le nom est requis, 2 caractères minimum.';
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(lastName)) {
            newErrors.lastName = 'Le nom doit comporter uniquement des lettres.';
        }
    
        if (firstName.trim().length < 2) {
            newErrors.firstName = 'Le prénom est requis, 2 caractères minimum.';
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(firstName)) {
            newErrors.firstName = 'Le prénom doit comporter uniquement des lettres.'
        }

    
        if (street.trim().length < 5) {
            newErrors.street = 'La rue est requise, minimum 5 caractères.';
        }
    
        if (city.trim().length < 3) {
            newErrors.city = 'La ville est requise, 3 caractères minimum.';
        }else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(firstName)) {
            newErrors.city = 'La ville doit comporter uniquement des lettres.'
        }

        if(selectedState === '') {
            newErrors.selectedState = 'Champ obligatoire.'
        }

        if(selectedDepartment === '') {
            newErrors.selectedDepartment = 'Champ obligatoire.'
        }
    
        if (!/^\d{5}$/.test(zipCode)) {
            newErrors.zipCode = 'Le code postal doit contenir 5 chiffres.';
        }
    
        setErrorMessage(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event)=> {
        event.preventDefault()
        
        const employee = {
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            dateOfBirth: format(dateOfBirth, "dd/MM/yyyy"),
            startDate: format(startDate, "dd/MM/yyyy"),
            department: selectedDepartment,
            street: street,
            city: city,
            state: selectedState,
            zipCode: zipCode
        };
        if(validate()) {
            console.log('Formulaire envoyé!')
            addEmployee(employee)
            setModalIsOpen(true)
            resetForm()
        }
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
                {errorMessage.firstName && <><span className='error'>{errorMessage.firstName}</span><br></br></>}

                <label htmlFor="last-name">Last Name</label>
                <input type="text" value={lastName} id="last-name" onChange={(e) => setLastName(e.target.value)} />
                {errorMessage.lastName && <><span className='error'>{errorMessage.lastName}</span><br></br></>}

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker
                    maxDate={subYears(new Date(), 15)}
                    locale={fr}
                    id="date-of-birth"
                    selected={dateOfBirth}
                    showIcon
                    onChange={(date) => setDateOfBirth(date)}
                    dateFormat="dd/MM/yyyy"
                />
                <span>*L'Âge doît être au minimum de 15 ans</span><br></br>

                <label htmlFor="start-date">Start Date</label>
                <DatePicker 
                    id="start-date"
                    selected={startDate}
                    showIcon
                    maxDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                    locale="fr"
                    dateFormat="dd/MM/yyyy"
                />

                <fieldset className="address">
                    <legend className='title-address'>Address</legend>

                    <label htmlFor="street">Street</label><br></br>
                    <input id="street" value={street} className="street" type="text" onChange={(e) => setStreet(e.target.value)} /><br></br>
                    {errorMessage.street && <><span className='error'>{errorMessage.street}</span><br></br><br></br></>}

                    <label htmlFor="city">City</label><br></br>
                    <input id="city" value={city} className="city" type="text" onChange={(e) => setCity(e.target.value)} /><br></br>
                    {errorMessage.city && <><span className='error'>{errorMessage.city}</span><br></br><br></br></>}

                    <label htmlFor="state">State</label><br></br>
                    <DropDown id="state" value={selectedState} data={States} title={'Choisir un état'} getData={handleSelectedState}/>
                    {errorMessage.selectedState && <><span className='error'>{errorMessage.selectedState}</span><br></br><br></br></>}

                    <label htmlFor="zip-code">Zip Code</label><br></br>
                    <input id="zip-code" value={zipCode} className="zip-code" type="text" onChange={(e) => setZipCode(e.target.value)}  /><br></br>
                    {errorMessage.zipCode && <span className='error'>{errorMessage.zipCode}</span>}
                </fieldset><br></br>

                <label htmlFor="department">Department</label><br></br>
                <DropDown data={Department} value={selectedDepartment} title={'Choisir un département'} getData={handleSelectedDepartment}/>
                {errorMessage.selectedDepartment && <span className='error'>{errorMessage.selectedDepartment}</span>}<br></br>

                <button type="submit" className="button">Save</button>
            </form><br></br>
            
            <br></br>

            {modalIsOpen &&
            <Modal closeModal={() => setModalIsOpen(false)} text={'Employee Created !'}/>
            }
        </>
    )
}

export default Form