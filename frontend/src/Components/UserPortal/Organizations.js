import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import OrganizationModal from '../Modals/OrganizationModal';
import axios from 'axios';
import '../AdminPortal/AdminServices.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api_url} from '../../config'

const Organizations = ()=> {
    const [organizations, setOrganizations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingOrg, setEditingOrg] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrganization, setSelectedOrganizations] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [orgData, setOrgData] = useState({
        organization_name: ''
    });


    useEffect(() => {
        
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`${api_url}/organizations/`);
            setOrganizations(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching Organizations:', error);
        }
    };


    const handleUpdateClick = async () => {
        try {
            await axios.put(`${api_url}/organizations/${editingOrg}`, orgData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchOrganizations();
            setEditingOrg(null);
        } catch (error) {
            console.error('Error updating organization name:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
        }
    };

    const handleDeleteClick = async (orgId) => {
        try {
            await axios.delete(`${api_url}/organizations/${orgId}`);
            fetchOrganizations();
            toast.success('Organization deleted successfully!')
        } catch (error) {
            toast.error('Error deleting Organization.');
        }
    };

    const handleEditClick = (organization) => {
        setEditingOrg(organization.organization_id);
        setOrgData({
            organization_name: organization.organization_name,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrgData(prevData => ({ ...prevData, [name]: value }));
    };
   
    // const filteredOrganizations = organizations.filter((organization) =>
    //     organization.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

        // Defensive checks added here
        const filteredOrganizations = organizations.filter((organization) => {
            const name = organization.organization_name;
            // console.log('Organization:', organization);
            // console.log('Organization Name:', name);
    
            return typeof name === 'string' && name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for search button click
  const handleSearchClick = (event) => {
    event.preventDefault();
    // Perform search action here if needed
  };

//   const confirmDelete = (organizationId) => {
//     if (window.confirm("Are you sure you want to delete this organization?")) {
//       handleDeleteClick(organizationId);
//     }
//   };

  const handleCheckboxChange = (organizationId) => {
    setSelectedOrganizations((prevSelected) => {
        if (prevSelected.includes(organizationId)) {
            return prevSelected.filter(id => id !== organizationId);
        } else {
            return [...prevSelected, organizationId];
        }
    });
};

const handleDeleteSelectedClick = async () => {

    try {
        await Promise.all(
            selectedOrganization.map((organizationId) =>
                axios.delete(`${api_url}/organizations/${organizationId}`)
            )
        );
        fetchOrganizations();
        setSelectedOrganizations([]);
        toast.success('Organization deleted successfully!')
    } catch (error) {
        toast.error('Error deleting Organization.');
    }
};

const handleSelectAllChange = () => {
    if (selectAll) {
        setSelectedOrganizations([]);
    } else {
        setSelectedOrganizations(filteredOrganizations.map(organization => organization.organization_id));
    }
    setSelectAll(!selectAll);
};

useEffect(() => {
    if (selectedOrganization.length === organizations.length && organizations.length !== 0) {
        setSelectAll(true);
    } else {
        setSelectAll(false);
    }
}, [selectedOrganization, organizations]);


// Custom confirmation component for the toast
const ConfirmToast = ({ onConfirm, onCancel }) => (
    <div>
        <p>Are you sure you want to delete this Organization?</p>
        <div>
            <button onClick={onConfirm} className="toast-confirm-btn me-4">Yes</button>
            <button onClick={onCancel} className="toast-cancel-btn">No</button>
        </div>
    </div>
);

const confirmDelete = (orgId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteClick(orgId);
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

const confirmSelectedDelete = (orgId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteSelectedClick(orgId);
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
        <div className='dash-org-list'>
          <form className="admin d-flex " role="search" >
                    <input className="form-control"  value={searchQuery} onChange={handleSearchChange} type="search" placeholder= "Search " aria-label="Search"/>
                    <button  className="dash-search-btn" type="submit" onClick={handleSearchClick}><i class="bi bi-search"></i></button>
                    </form>
            <h1 >Organizations List</h1>
            <button className='admin form-btn'  onClick={() => setShowModal(true)}>Add <i class=" bi bi-person-plus-fill " style={{marginLeft:"0.5rem", marginRight:"0.5rem" }}></i></button>           
            <div className = "main-div">
            <div className='select-options'>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    /> Select All
                    <button className='admin del btn' onClick={confirmSelectedDelete} disabled={selectedOrganization.length === 0}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            <div className='table-wrapper'>
             
            <table className='table-data'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th >Organization ID</th>
                        <th className='expand-service'>Organization Name</th>
                        <th className='expand-service'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrganizations.map((organization) => (
                        <tr key={organization.organization_id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedOrganization.includes(organization.organization_id)}
                                    onChange={() => handleCheckboxChange(organization.organization_id)}
                                />
                            </td>
                            <td >{organization.organization_id}</td>
                            <td>{organization.organization_name}</td>
                            <td>
                                <span className='actions'>
                                            <BsFillPencilFill onClick={() => handleEditClick(organization)} />
                                            <BsFillTrashFill className="ms-4 delete-btn" onClick={() => confirmDelete(organization.organization_id)} />
                                </span>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingOrg && (
                    <div className='vendor-update'>
                    <div className='update-form'>
                        <h2>Edit Organization</h2>
                        <form>
                            <div className='update-form-gr'>
                                <input name="organization_name" value={orgData.organization_name} onChange={handleChange} placeholder="Organization" className='update-form-grp' />
                                <br />
                                <button type="button" onClick={handleUpdateClick} className='form-btn me-2'>Update</button>
                                <button type="button" onClick={() => setEditingOrg(null)} className='cancel-btn'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

                {showModal && (
                    <OrganizationModal closeModal={() => setShowModal(false)} fetchOrganizations={fetchOrganizations} />
                )}




            </div>
            </div>
            <ToastContainer position="bottom-left"  />
            </div>
      
    );
}

export default Organizations;