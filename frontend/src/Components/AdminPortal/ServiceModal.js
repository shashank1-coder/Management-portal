import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';



export const ServiceModal = ({ closeModal, fetchServices }) => {
    const [serviceData, setServiceData] = useState({
        service_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/services/', serviceData);
            fetchServices(); // Refetch vendors after successful submission
            closeModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal(); 
        }}>
            <div className='modals'>
                <form onSubmit={handleSubmit}>
                  
                    <div className='form-group'>
                        <label htmlFor='service_name'>Services</label>
                        <input name='service_name' value={serviceData.service_name} onChange={handleChange} required />
                    </div>
                
                    
                    <button type='submit' className='form-btn'>Submit</button>
                    {/* <button type='button' className='cancel-btn' onClick={closeModal}>Cancel</button> */}
                </form>
            </div>
        </div>
    );
};

export default ServiceModal;