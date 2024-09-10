import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import VendorModal from '../Modals/VendorModal';
import EmailModal from '../Modals/EmailModal'; // Import the EmailModal component
import "./AdminVendorList.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api_url} from '../../config'

const AdminVendorList = () => {
    const [vendors, setVendors] = useState([]);
    const [editingVendor, setEditingVendor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [vendorData, setVendorData] = useState({
        name: '',
        organization_name: '',
        role_name: '',
        service_name: '',
        phone: '',
        email: ''
    });
    const [showEmailModal, setShowEmailModal] = useState(false); // State for email modal

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get('${api_url}/');
            setVendors(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const handleUpdateClick = async () => {
        try {
            await axios.put(`${api_url}:8000/vendors/${editingVendor}`, vendorData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchVendors();
            setEditingVendor(null);
        } catch (error) {
            console.error('Error updating vendor:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
        }
    };

    const handleDeleteClick = async (vendorId) => {
        try {
            await axios.delete(`http://localhost:8000/vendors/${vendorId}`);
            fetchVendors();
            toast.success('Vendor deleted successfully!');
        } catch (error) {
            toast.error('Error deleting vendor.');
        }
    };

    const handleEditClick = (vendor) => {
        setEditingVendor(vendor.vendor_id);
        setVendorData({
            name: vendor.name,
            organization_name: vendor.organization_name,
            role_name: vendor.role_name,
            service_name: vendor.service_name,
            phone: vendor.phone,
            email: vendor.email
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorData(prevData => ({ ...prevData, [name]: value }));
    };

    const filteredVendors = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = (event) => {
        event.preventDefault();
    };

    const handleCheckboxChange = (vendorId) => {
        setSelectedVendors((prevSelected) => {
            if (prevSelected.includes(vendorId)) {
                return prevSelected.filter(id => id !== vendorId);
            } else {
                return [...prevSelected, vendorId];
            }
        });
    };

    const handleDeleteSelectedClick = async () => {
       
        try {
            await Promise.all(
                selectedVendors.map((vendorId) =>
                    axios.delete(`http://localhost:8000/vendors/${vendorId}`)
                )
            );
            fetchVendors();
            setSelectedVendors([]);
            toast.success('Vendor deleted successfully!');
        } catch (error) {
            toast.error('Error deleting vendor.');
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedVendors([]);
        } else {
            setSelectedVendors(filteredVendors.map(vendor => vendor.vendor_id));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (selectedVendors.length === vendors.length && vendors.length !== 0) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedVendors, vendors]);

// Custom confirmation component for the toast
const ConfirmToast = ({ onConfirm, onCancel }) => (
    <div>
        <p>Are you sure you want to delete this Vendor?</p>
        <div>
            <button onClick={onConfirm} className="toast-confirm-btn me-4">Yes</button>
            <button onClick={onCancel} className="toast-cancel-btn">No</button>
        </div>
    </div>
);

const confirmDelete = (vendorId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteClick(vendorId);
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

const confirmSelectedDelete = (vendorId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteSelectedClick(vendorId);
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


    const handleSendMailClick = () => {
        if (selectedVendors.length === 0) {
            alert("Please select at least one vendor to send an email.");
            return;
        }
        setShowEmailModal(true);
    };

    const handleVendorCreated = () => {
        toast.success('Vendor created successfully!')
    };

    return (
        <div className='dash-vendor-list'>
            <form className="admin d-flex" role="search">
                <input className="form-control" value={searchQuery} onChange={handleSearchChange} type="search" placeholder="Search" aria-label="Search" />
                <button className="dash-search-btn" type="submit" onClick={handleSearchClick}><i className="bi bi-search"></i></button>
            </form>

            <h1>Vendor List</h1>
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
                    <button className='admin del btn' onClick={confirmSelectedDelete} disabled={selectedVendors.length === 0}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                    <button className='admin email btn' onClick={handleSendMailClick} disabled={selectedVendors.length === 0}>
                        <i className="bi bi-envelope-fill"></i> Send Mail
                    </button>
                </div>
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>ID</th>
                                <th className='expand'>Name</th>
                                <th>Organization</th>
                                <th>Role</th>
                                <th>Service</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.map(vendor => (
                                <tr key={vendor.vendor_id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedVendors.includes(vendor.vendor_id)}
                                            onChange={() => handleCheckboxChange(vendor.vendor_id)}
                                        />
                                    </td>
                                    <td>{vendor.vendor_id}</td>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.organization_name}</td>
                                    <td>{vendor.role_name}</td>
                                    <td>{vendor.service_name}</td>
                                    <td>{vendor.phone}</td>
                                    <td>{vendor.email}</td>
                                    <td>
                                        <span className='actions'>
                                            <BsFillPencilFill onClick={() => handleEditClick(vendor)} />
                                            <BsFillTrashFill className="ms-4 delete-btn" onClick={() => confirmDelete(vendor.vendor_id)} />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingVendor && (
                        <div className='vendor-update'>
                            <div className='update-form'>
                                <h2>Edit Vendor</h2>
                                <form>
                                    <div className='update-form-gr'>
                                        <input name="name" value={vendorData.name} onChange={handleChange} placeholder="Name" className='update-form-grp' />
                                        <input name="organization_name" value={vendorData.organization_name} onChange={handleChange} placeholder="Organization" className='update-form-grp' />
                                        <input name="role_name" value={vendorData.role_name} onChange={handleChange} placeholder="Role" className='update-form-grp' />
                                        <input name="service_name" value={vendorData.service_name} onChange={handleChange} placeholder="Service" className='update-form-grp' />
                                        <input name="phone" value={vendorData.phone} onChange={handleChange} placeholder="Phone" className='update-form-grp' />
                                        <input name="email" value={vendorData.email} onChange={handleChange} placeholder="Email" className='update-form-grp' />
                                        <button className="form-btn me-2" onClick={handleUpdateClick}>Update</button>
                                        <button className="cancel-btn" onClick={() => setEditingVendor(null)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {showModal && (
                    <VendorModal closeModal={() => setShowModal(false)}   fetchVendors={fetchVendors} onVendorCreated={handleVendorCreated}   />
                )}

                {showEmailModal && (
                    <EmailModal 
                        selectedVendors={selectedVendors.map(vendorId => vendors.find(vendor => vendor.vendor_id === vendorId)?.vendor_id)}
                        closeModal={() => setShowEmailModal(false)}
                    />
                )}

            </div>
            <ToastContainer position="bottom-left"  />
        </div>
    );
};

export default AdminVendorList;


