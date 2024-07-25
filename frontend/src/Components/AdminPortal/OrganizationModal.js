import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';



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
            await axios.post('http://localhost:8000/organizations/', orgData);
            fetchOrganizations(); // Refetch vendors after successful submission
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
                        <label htmlFor='organization_name'>Organization</label>
                        <input name='organization_name' value={orgData.organization_name} onChange={handleChange} required />
                    </div>
                
                    
                    <button type='submit' className='form-btn'>Submit</button>
                    {/* <button type='button' className='cancel-btn' onClick={closeModal}>Cancel</button> */}
                </form>
            </div>
        </div>
    );
};

export default OrganizationModal;