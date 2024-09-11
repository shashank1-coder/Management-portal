import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';
import {api_url} from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OrganizationModal = ({ closeModal, fetchOrganizations }) => {
    const [orgData, setOrgData] = useState({
        organization_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrgData({ ...orgData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${api_url}/organizations/`, orgData);
            fetchOrganizations(); // Refetch vendors after successful submission
            toast.success('Organization added successfully!');
            closeModal(); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating organization:', error);
            if (error.response && error.response.status === 409) {
                toast.error('Error: Organization name already exists. Please choose a different name.');
            } else {
                toast.error('Error creating organization. Please try again.');
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
                        <label htmlFor='organization_name'>Organization</label>
                        <input name='organization_name' value={orgData.organization_name} onChange={handleChange} required />
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

export default OrganizationModal;