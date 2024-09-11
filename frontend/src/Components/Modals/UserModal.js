import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';
import {api_url} from '../../config'

export const UserModal = ({ closeModal, fetchUsers}) => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        password: '',
        role: 'user' // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${api_url}/create_user`, userData);
            
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
                    <label htmlFor='email'>Email</label>
                    <input name='email' value={userData.email} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='role'>Role</label>
                    <select name='role' value={userData.role} onChange={handleChange} required>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
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

export default UserModal;