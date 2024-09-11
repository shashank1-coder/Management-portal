import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';
import {api_url} from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            await axios.post(`${api_url}/services/`, serviceData);
            fetchServices(); // Refetch services after successful submission
            toast.success('Service added successfully!');
            closeModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating service:', error);
            if (error.response && error.response.status === 409) {
                toast.error('Error: Service name already exists. Please choose a different name.');
            } else {
                toast.error('Error creating service. Please try again.');
            }
        }
    };
    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal(); 
        }}>
            <div className='modals'>
                <form onSubmit={handleSubmit}>
                  
                    <div className='form-group'>
                        <label htmlFor='service_name'>Service</label>
                        <input name='service_name' value={serviceData.service_name} onChange={handleChange} required />
                    </div>
                
                    <div className='Buttons-align'>
                    <button type='submit' className='form-btn me-4'>Submit</button>
                    <button type='button' className='cancel-btn' onClick={closeModal}>Cancel</button>
                    </div>     
                </form>
            </div>
            <ToastContainer position="bottom-left" />
        </div>
    );
};

export default ServiceModal;