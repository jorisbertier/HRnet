import React from 'react'
import './index.css'

function Modal({ closeModal }) {
    return (
        <div className='bloc-modal'>
        <div className='modal'>
            <p>Employee Created !</p>
            <div className='close' onClick={closeModal}>X</div>
        </div>

        </div>
    )
}

export default Modal