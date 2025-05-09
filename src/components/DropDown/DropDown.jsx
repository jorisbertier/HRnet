import React, { useState, useEffect, useRef } from 'react'
import './index.css'

function DropDown({data, title, getData, value}) {

    const [isOpen, setIsOpen] = useState(false);
    const [dataDropdown, setDataDropdown] = useState(title);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const handleData = (name) => {
        setDataDropdown(name)
        getData(name)
    }

    useEffect(() => {
        setDataDropdown(value || title)
    }, [value, title]);


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
            <span className='title-dropdown'>{dataDropdown}</span>
            <span className={`icon ${isOpen ? "rotated" : ""}`}>
                <svg viewBox="0 0 24 24" width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffff"></path> </g></svg>
            </span>
        </button>
        {isOpen &&
            <div className="dropdown">
                <ul>
                {data.map((item, index) => (
                    <li key={index} onClick={()=> handleData(item.name)}>
                        <span>{item.name}</span>
                    </li>
                ))}
                </ul>
            </div>
        }
        </div>
    </div>
    );
};

export default DropDown