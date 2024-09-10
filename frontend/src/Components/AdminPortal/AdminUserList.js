import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import UserModal from '../Modals/UserModal';
import "./AdminVendorList.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api_url} from '../../config'

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        password: '',
        role: '',
        email:''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${api_url}/users`);
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching Users:', error);
        }
    };

    const handleUpdateClick = async () => {
        try {
            await axios.put(`${api_url}/users/${editingUser}`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchUsers();
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating User:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
        }
    };

    const handleDeleteClick = async (userId) => {
        try {
            await axios.delete(`${api_url}/users/${userId}`);
            fetchUsers();
            toast.success('User deleted successfully!');
        } catch (error) {
            toast.error('Error deleting User.');
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.user_id);
        setUserData({
            name: user.name,
            username: user.username,
            password: user.password,
            role: user.role,
            email: user.email
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = (event) => {
        event.preventDefault();
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter(id => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const handleDeleteSelectedClick = async () => {
    
        try {
            await Promise.all(
                selectedUsers.map((userId) =>
                    axios.delete(`${api_url}/Users/${userId}`)
                )
            );
            fetchUsers();
            setSelectedUsers([]);
            toast.success('User deleted successfully!');
        } catch (error) {
            toast.error('Error deleting User.');
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(user => user.user_id));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (selectedUsers.length === users.length && users.length !== 0) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedUsers, users]);


// Custom confirmation component for the toast
const ConfirmToast = ({ onConfirm, onCancel }) => (
    <div>
        <p>Are you sure you want to delete this User?</p>
        <div>
            <button onClick={onConfirm} className="toast-confirm-btn me-4">Yes</button>
            <button onClick={onCancel} className="toast-cancel-btn">No</button>
        </div>
    </div>
);

const confirmDelete = (userId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteClick(userId);
                toast.dismiss(toastId); // Dismiss the toast after confirmation
            }}
            onCancel={() => toast.dismiss(toastId)} // Dismiss the toast if canceled
        />, {
        autoClose: false, // Don't auto close, wait for user interaction
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        position: "top-center"
    });
};

const confirmSelectedDelete = (userId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteSelectedClick(userId);
                toast.dismiss(toastId); // Dismiss the toast after confirmation
            }}
            onCancel={() => toast.dismiss(toastId)} // Dismiss the toast if canceled
        />, {
        autoClose: false, // Don't auto close, wait for user interaction
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        position: "top-center"
    });
};

    return (
        <div className='dash-vendor-list'>
            <form className="admin d-flex" role="search">
                <input className="form-control" value={searchQuery} onChange={handleSearchChange} type="search" placeholder="Search" aria-label="Search" />
                <button className="dash-search-btn" type="submit" onClick={handleSearchClick}><i className="bi bi-search"></i></button>
            </form>

            <h1>User List</h1>
            <div>
                <button className='admin form-btn' onClick={() => setShowModal(true)}>Add <i className="bi bi-person-plus-fill" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}></i></button>
            </div>
            <div className='main-div'>
            <div className='select-options'>
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                /> Select All
                <button className='admin del btn' onClick={confirmSelectedDelete} disabled={selectedUsers.length === 0}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
            <div className='table-wrapper'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th >Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.user_id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.user_id)}
                                        onChange={() => handleCheckboxChange(user.user_id)}
                                    />
                                </td>
                                <td>{user.user_id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span className='user-actions'>
                                        <BsFillPencilFill onClick={() => handleEditClick(user)} />
                                        <BsFillTrashFill className="ms-4 delete-btn" onClick={() => confirmDelete(user.user_id)} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingUser && (
                    <div className='vendor-update'>
                        <div className='update-form'>
                            <h2>Edit User</h2>
                            <br />
                            <form>
                                <div className='update-form-gr'>
                                    <input name="name" value={userData.name} onChange={handleChange} placeholder="Name" className='update-form-grp' />
                                    <input name="username" value={userData.username} onChange={handleChange} placeholder="Username" className='update-form-grp' />
                                    {/* <input name="password" value={userData.password} onChange={handleChange} placeholder="Password" className='update-form-grp' /> */}
                                    <input name="email" value={userData.email} onChange={handleChange} placeholder="Email" className='update-form-grp' />
                                    {/* <input name="role" value={userData.role} onChange={handleChange} placeholder="Role" className='update-form-grp' /> */}
                                    <select name='role' value={userData.role} onChange={handleChange} placeholder="Role" className='update-form-grp' style={{padding:"0.3rem 3.8rem"}}>
                                        <option value='user'>User</option>
                                        <option value='admin'>Admin</option>
                                    </select>
                                    <button  className="form-btn me-2" onClick={handleUpdateClick}>Update</button>
                                    <button className="cancel-btn-user" onClick={() => setEditingUser(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <UserModal closeModal={() => setShowModal(false)}
                    fetchUsers={fetchUsers}
                />
            )}
        </div>
        <ToastContainer position="bottom-left"  />
        </div>
        
    );
};

export default AdminUserList;