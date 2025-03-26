import React, { useState, useEffect, useRef } from 'react'
import './index.css'

function DropDown({data, title}) {

    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState(title);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }
    const handleStateName = (name) => {
        setState(name)
    }

    useEffect(() => {
        console.log(state);
    }, [state]); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
    <div>
        <div ref={dropdownRef} className="dropdown-container">
        <button type="button" className="dropdown-button" onClick={toggleDropdown}>
            <span>{state}</span>
            <span className={`icon ${isOpen ? "rotated" : ""}`}>
                <svg viewBox="0 0 24 24" width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffff"></path> </g></svg>
            </span>
        </button>
        {isOpen &&
            <div className="dropdown">
                <ul>
                {data.map((state, index) => (
                    <li key={index} onClick={()=> handleStateName(state.name)}>
                        <span>{state.name}</span>
                    </li>
                ))}
                </ul>
            </div>
        }
        </div>
    </div>
    );
};

// const states = [
//     {
//         "name": "Alabama",
//         "abbreviation": "AL"
//     },
//     {
//         "name": "Alaska",
//         "abbreviation": "AK"
//     },
//     {
//         "name": "American Samoa",
//         "abbreviation": "AS"
//     },
//     {
//         "name": "Arizona",
//         "abbreviation": "AZ"
//     },
//     {
//         "name": "Arkansas",
//         "abbreviation": "AR"
//     },
//     {
//         "name": "California",
//         "abbreviation": "CA"
//     },
//     {
//         "name": "Colorado",
//         "abbreviation": "CO"
//     },
//     {
//         "name": "Connecticut",
//         "abbreviation": "CT"
//     },
//     {
//         "name": "Delaware",
//         "abbreviation": "DE"
//     },
//     {
//         "name": "District Of Columbia",
//         "abbreviation": "DC"
//     },
//     {
//         "name": "Federated States Of Micronesia",
//         "abbreviation": "FM"
//     },
//     {
//         "name": "Florida",
//         "abbreviation": "FL"
//     },
//     {
//         "name": "Georgia",
//         "abbreviation": "GA"
//     },
//     {
//         "name": "Guam",
//         "abbreviation": "GU"
//     },
//     {
//         "name": "Hawaii",
//         "abbreviation": "HI"
//     },
//     {
//         "name": "Idaho",
//         "abbreviation": "ID"
//     },
//     {
//         "name": "Illinois",
//         "abbreviation": "IL"
//     },
//     {
//         "name": "Indiana",
//         "abbreviation": "IN"
//     },
//     {
//         "name": "Iowa",
//         "abbreviation": "IA"
//     },
//     {
//         "name": "Kansas",
//         "abbreviation": "KS"
//     },
//     {
//         "name": "Kentucky",
//         "abbreviation": "KY"
//     },
//     {
//         "name": "Louisiana",
//         "abbreviation": "LA"
//     },
//     {
//         "name": "Maine",
//         "abbreviation": "ME"
//     },
//     {
//         "name": "Marshall Islands",
//         "abbreviation": "MH"
//     },
//     {
//         "name": "Maryland",
//         "abbreviation": "MD"
//     },
//     {
//         "name": "Massachusetts",
//         "abbreviation": "MA"
//     },
//     {
//         "name": "Michigan",
//         "abbreviation": "MI"
//     },
//     {
//         "name": "Minnesota",
//         "abbreviation": "MN"
//     },
//     {
//         "name": "Mississippi",
//         "abbreviation": "MS"
//     },
//     {
//         "name": "Missouri",
//         "abbreviation": "MO"
//     },
//     {
//         "name": "Montana",
//         "abbreviation": "MT"
//     },
//     {
//         "name": "Nebraska",
//         "abbreviation": "NE"
//     },
//     {
//         "name": "Nevada",
//         "abbreviation": "NV"
//     },
//     {
//         "name": "New Hampshire",
//         "abbreviation": "NH"
//     },
//     {
//         "name": "New Jersey",
//         "abbreviation": "NJ"
//     },
//     {
//         "name": "New Mexico",
//         "abbreviation": "NM"
//     },
//     {
//         "name": "New York",
//         "abbreviation": "NY"
//     },
//     {
//         "name": "North Carolina",
//         "abbreviation": "NC"
//     },
//     {
//         "name": "North Dakota",
//         "abbreviation": "ND"
//     },
//     {
//         "name": "Northern Mariana Islands",
//         "abbreviation": "MP"
//     },
//     {
//         "name": "Ohio",
//         "abbreviation": "OH"
//     },
//     {
//         "name": "Oklahoma",
//         "abbreviation": "OK"
//     },
//     {
//         "name": "Oregon",
//         "abbreviation": "OR"
//     },
//     {
//         "name": "Palau",
//         "abbreviation": "PW"
//     },
//     {
//         "name": "Pennsylvania",
//         "abbreviation": "PA"
//     },
//     {
//         "name": "Puerto Rico",
//         "abbreviation": "PR"
//     },
//     {
//         "name": "Rhode Island",
//         "abbreviation": "RI"
//     },
//     {
//         "name": "South Carolina",
//         "abbreviation": "SC"
//     },
//     {
//         "name": "South Dakota",
//         "abbreviation": "SD"
//     },
//     {
//         "name": "Tennessee",
//         "abbreviation": "TN"
//     },
//     {
//         "name": "Texas",
//         "abbreviation": "TX"
//     },
//     {
//         "name": "Utah",
//         "abbreviation": "UT"
//     },
//     {
//         "name": "Vermont",
//         "abbreviation": "VT"
//     },
//     {
//         "name": "Virgin Islands",
//         "abbreviation": "VI"
//     },
//     {
//         "name": "Virginia",
//         "abbreviation": "VA"
//     },
//     {
//         "name": "Washington",
//         "abbreviation": "WA"
//     },
//     {
//         "name": "West Virginia",
//         "abbreviation": "WV"
//     },
//     {
//         "name": "Wisconsin",
//         "abbreviation": "WI"
//     },
//     {
//         "name": "Wyoming",
//         "abbreviation": "WY"
//     }
// ];
export default DropDown