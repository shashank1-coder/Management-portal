import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';
import {api_url} from '../../config'

export const VendorModal = ({ closeModal, fetchVendors }) => {
    const [vendorData, setVendorData] = useState({
        name: '',
        organization_name: '',
        role_name: '',
        service_name: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorData({ ...vendorData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${api_url}/vendors/`, vendorData);
            fetchVendors(); // Refetch vendors after successful submission
            closeModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating vendor:', error);
        }
    };

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === "modal-container") closeModal(); 
        }}>
            <div className='modals'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input name='name' value={vendorData.name} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='organization_name'>Organization</label>
                        <input name='organization_name' value={vendorData.organization_name} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='role_name'>Role</label>
                        <input name='role_name' value={vendorData.role_name} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='service_name'>Service</label>
                        <input name='service_name' value={vendorData.service_name} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone</label>
                        <input name='phone' value={vendorData.phone} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input name='email' value={vendorData.email} onChange={handleChange} required />
                    </div>
                    <div className='Buttons-align'>
                    <button type='submit' className='form-btn me-4'>Submit</button>
                    <button type='button' className='cancel-btn' onClick={closeModal}>Cancel</button>
                    </div>     
                </form>
            </div>
        </div>
    );
};

export default VendorModal;

