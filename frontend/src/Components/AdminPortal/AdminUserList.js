import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import UserModal from './UserModal';
import "./AdminVendorList.css";

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
        role: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching Users:', error);
        }
    };

    const handleUpdateClick = async () => {
        try {
            await axios.put(`http://localhost:8000/users/${editingUser}`, userData, {
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
            await axios.delete(`http://localhost:8000/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting User:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.user_id);
        setUserData({
            name: user.name,
            username: user.username,
            password: user.password,
            role: user.role
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
        const confirmation = window.confirm("Are you sure you want to delete the selected users?");
        if (!confirmation) {
            return;
        }
        try {
            await Promise.all(
                selectedUsers.map((userId) =>
                    axios.delete(`http://localhost:8000/Users/${userId}`)
                )
            );
            fetchUsers();
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error deleting selected Users:', error);
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


    const confirmDelete = (vendorId) => {
        if (window.confirm("Are you sure you want to delete this vendor?")) {
          handleDeleteClick(vendorId);
        }
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
            <br />
            <div className='table-wrapper'>
                <div className='select-options'>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    /> Select All
                    <button className='admin del btn' onClick={handleDeleteSelectedClick} disabled={selectedUsers.length === 0}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>ID</th>
                            <th className='expand'>Name</th>
                            <th>Username</th>
                            <th>Password</th>
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
                                <td>{user.User_id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span className='actions'>
                                        <BsFillPencilFill onClick={() => handleEditClick(user)} />
                                        <BsFillTrashFill className="delete-btn" onClick={() => confirmDelete(user.user_id)} />
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
                            <form>
                                <div className='update-form-gr'>
                                    <input name="name" value={userData.name} onChange={handleChange} placeholder="Name" className='update-form-grp' />
                                    <input name="username" value={userData.username} onChange={handleChange} placeholder="Username" className='update-form-grp' />
                                    <input name="password" value={userData.password} onChange={handleChange} placeholder="Password" className='update-form-grp' />
                                    <input name="role" value={userData.role} onChange={handleChange} placeholder="Role" className='update-form-grp' />
                                    <button onClick={handleUpdateClick}>Update</button>
                                    <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
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
    );
};

export default AdminUserList;