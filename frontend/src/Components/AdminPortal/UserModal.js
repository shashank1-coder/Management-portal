import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';



export const UserModal = ({ closeModal, fetchUsers }) => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/create_user', userData);
            fetchUsers(); // Refetch vendors after successful submission
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
                    <input name='name' value={userData.name} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input name='username' value={userData.username} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input name='password' value={userData.password} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='role'>Role</label>
                    <input name='role' value={userData.role} onChange={handleChange} required />
                </div>
                
                
                    
                    <button type='submit' className='form-btn'>Submit</button>
                    {/* <button type='button' className='cancel-btn' onClick={closeModal}>Cancel</button> */}
                </form>
            </div>
        </div>
    );
};

export default UserModal;