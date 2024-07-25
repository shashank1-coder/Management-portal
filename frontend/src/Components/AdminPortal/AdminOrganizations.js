import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import OrganizationModal from './OrganizationModal';
import axios from 'axios';
import './AdminServices.css'


const AdminOrganizations = ()=> {
    const [organizations, setOrganizations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingOrg, setEditingOrg] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [orgData, setOrgData] = useState({
        organization_name: ''
    });


    useEffect(() => {
        
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/organizations/');
            setOrganizations(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching Organizations:', error);
        }
    };


    const handleUpdateClick = async () => {
        try {
            await axios.put(`http://localhost:8000/organizations/${editingOrg}`, orgData, {
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
            await axios.delete(`http://localhost:8000/organizations/${orgId}`);
            fetchOrganizations();
        } catch (error) {
            console.error('Error deleting vendor:', error);
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

  const confirmDelete = (vendorId) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      handleDeleteClick(vendorId);
    }
  };


    return (
        <div className='dash-org-list'>
          <form className="admin d-flex " role="search" >
                    <input className="form-control"  value={searchQuery} onChange={handleSearchChange} type="search" placeholder= "Search " aria-label="Search"/>
                    <button  className="dash-search-btn" type="submit" onClick={handleSearchClick}><i class="bi bi-search"></i></button>
                    </form>
            <h1 >Organizations List</h1>
            <button className='admin form-btn'  onClick={() => setShowModal(true)}>Add <i class=" bi bi-person-plus-fill " style={{marginLeft:"0.5rem", marginRight:"0.5rem" }}></i></button>           
          <br/>
            <div className='table-wrapper'>
             <div className='table-data'>
            <table>
                <thead>
                    <tr>
                        <th >Organization ID</th>
                        <th className='expand-service'>Organization Name</th>
                        <th className='expand-service'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrganizations.map((organization) => (
                        <tr key={organization.organization_id}>
                            <td >{organization.organization_id}</td>
                            <td>{organization.organization_name}</td>
                            <td>
                                <span className='actions'>
                                            <BsFillPencilFill onClick={() => handleEditClick(organization)} />
                                            <BsFillTrashFill className="delete-btn" onClick={() => confirmDelete(organization.organization_id)} />
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
                                    <button type="button" onClick={handleUpdateClick} className='form-btn'>Update</button>
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
            </div>
      
    );
}

export default AdminOrganizations;


