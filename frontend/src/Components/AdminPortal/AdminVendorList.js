import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import Modal from './VendorModal';
import "./AdminVendorList.css";

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

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get('http://localhost:8000/');
            setVendors(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const handleUpdateClick = async () => {
        try {
            await axios.put(`http://localhost:8000/vendors/${editingVendor}`, vendorData, {
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
        } catch (error) {
            console.error('Error deleting vendor:', error);
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
        const confirmation = window.confirm("Are you sure you want to delete the selected users?");
        if (!confirmation) {
            return;
        }
        try {
            await Promise.all(
                selectedVendors.map((vendorId) =>
                    axios.delete(`http://localhost:8000/vendors/${vendorId}`)
                )
            );
            fetchVendors();
            setSelectedVendors([]);
        } catch (error) {
            console.error('Error deleting selected vendors:', error);
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

            <h1>Vendor List</h1>
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
                    <button className='admin del btn' onClick={handleDeleteSelectedClick} disabled={selectedVendors.length === 0}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
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
                                        <BsFillTrashFill className="delete-btn" onClick={() => confirmDelete(vendor.vendor_id)} />
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
                                    <button onClick={handleUpdateClick}>Update</button>
                                    <button className="cancel-btn" onClick={() => setEditingVendor(null)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    fetchVendors={fetchVendors}
                </Modal>
            )}
        </div>
    );
};

export default AdminVendorList;












// import React, { useEffect, useState } from 'react';
// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import axios from 'axios';
// import Modal from './Modal';
// import "./AdminVendorList.css";


// const AdminVendorList = () => {
//     const [vendors, setVendors] = useState([]);
//     const [editingVendor, setEditingVendor] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [selectedVendors, setSelectedVendors] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);
//     const [vendorData, setVendorData] = useState({
//         name: '',
//         organization_name: '',
//         role_name: '',
//         service_name: '',
//         phone: '',
//         email: ''
//     });

//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     const fetchVendors = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/');
//             setVendors(Array.isArray(response.data) ? response.data : []);
//         } catch (error) {
//             console.error('Error fetching vendors:', error);
//         }
//     };

//     const handleUpdateClick = async () => {
//         try {
//             await axios.put(`http://localhost:8000/vendors/${editingVendor}`, vendorData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             fetchVendors();
//             setEditingVendor(null);
//         } catch (error) {
//             console.error('Error updating vendor:', error);
//             if (error.response) {
//                 console.error('Server response:', error.response.data);
//             }
//         }
//     };

//     const handleDeleteClick = async (vendorId) => {
//         try {
//             await axios.delete(`http://localhost:8000/vendors/${vendorId}`);
//             fetchVendors();
//         } catch (error) {
//             console.error('Error deleting vendor:', error);
//         }
//     };

//     const handleEditClick = (vendor) => {
//         setEditingVendor(vendor.vendor_id);
//         setVendorData({
//             name: vendor.name,
//             organization_name: vendor.organization_name,
//             role_name: vendor.role_name,
//             service_name: vendor.service_name,
//             phone: vendor.phone,
//             email: vendor.email
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setVendorData(prevData => ({ ...prevData, [name]: value }));
//     };

//     const filteredVendors = vendors.filter((vendor) =>
//         vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Handler for search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handler for search button click
//   const handleSearchClick = (event) => {
//     event.preventDefault();
//     // Perform search action here if needed
//   };


//   const handleCheckboxChange = (vendorId) => {
//     setSelectedVendors((prevSelected) => {
//         if (prevSelected.includes(vendorId)) {
//             return prevSelected.filter(id => id !== vendorId);
//         } else {
//             return [...prevSelected, vendorId];
//         }
//     });
// };

//     const handleDeleteSelectedClick = async () => {
//         try {
//             await Promise.all(
//                 selectedVendors.map((vendorId) =>
//                     axios.delete(`http://localhost:8000/vendors/${vendorId}`)
//                 )
//             );
//             fetchVendors();
//             setSelectedVendors([]);
//         } catch (error) {
//             console.error('Error deleting selected vendors:', error);
//         }
//     };


//     const handleSelectAllChange = () => {
//         if (selectAll) {
//             setSelectedVendors([]);
//         } else {
//             setSelectedVendors(filteredVendors.map(vendor => vendor.vendor_id));
//         }
//         setSelectAll(!selectAll);
//     };

//     useEffect(() => {
//         if (selectedVendors.length === vendors.length && vendors.length !== 0) {
//             setSelectAll(true);
//         } else {
//             setSelectAll(false);
//         }
//     }, [selectedVendors, vendors]);




//     return (
//         <div className='dash-vendor-list'>
            
                     
//                  {/* <div className='table-wrapper'> */}
                     
//                     {/* <div className='dash-search'> */}
//                     <form className="admin d-flex " role="search" >
//                     <input className="form-control"  value={searchQuery} onChange={handleSearchChange} type="search" placeholder= "Search " aria-label="Search"/>
//                     <button  className="dash-search-btn" type="submit" onClick={handleSearchClick}><i class="bi bi-search"></i></button>
//                     </form>
//                     {/* </div>  */}
                   
//                 <h1 >Vendor List</h1>   
//                 <div>
//                 <button className='admin form-btn'  onClick={() => setShowModal(true)}>Add <i class=" bi bi-person-plus-fill " style={{marginLeft:"0.5rem", marginRight:"0.5rem" }}></i></button>           
//                 </div>
//                 <br/>
//                 <div className='table-wrapper'>
                    
//                 <div className='select-options'>
                    
//                 {/* <button className='admin del btn' onClick={handleDeleteSelectedClick} disabled={selectedVendors.length === 0}>
//                  <i className="bi bi-app " ></i>
//                  </button>    */}

//                     <input
//                         type="checkbox"
//                         checked={selectAll}
//                         onChange={handleSelectAllChange}
//                     /> Select All
                
//                 <button className='admin del btn' onClick={handleDeleteSelectedClick} disabled={selectedVendors.length === 0}>
//                  <i className="bi bi-trash-fill" ></i>
//                  </button>   
//                 </div>
//                 <table className='table'>
//                     <thead>
                        
//                         <tr>
//                             <th>Select</th>
//                             <th>ID</th>
//                             <th className='expand'>Name</th>
//                             <th>Organization</th>
//                             <th>Role</th>
//                             <th>Service</th>
//                             <th>Phone</th>
//                             <th>Email</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredVendors.map(vendor => (
//                             <tr key={vendor.vendor_id}>
//                                  <td>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedVendors.includes(vendor.vendor_id)}
//                                         onChange={() => handleCheckboxChange(vendor.vendor_id)}
//                                     />
//                                 </td>
//                                 <td>{vendor.vendor_id}</td>
//                                 <td>{vendor.name}</td>
//                                 <td>{vendor.organization_name}</td>
//                                 <td>{vendor.role_name}</td>
//                                 <td>{vendor.service_name}</td>
//                                 <td>{vendor.phone}</td>
//                                 <td>{vendor.email}</td>
//                                 <td>
//                                     <span className='actions'>
//                                         <BsFillPencilFill onClick={() => handleEditClick(vendor)} />
//                                         <BsFillTrashFill className="delete-btn" onClick={() => handleDeleteClick(vendor.vendor_id)} />
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {editingVendor && (
//                     <div className='vendor-update'>
//                         <div className='update-form'>
//                             <h2>Edit Vendor</h2>
//                             <form>
//                                 <div className='update-form-gr'>
//                                     <input name="name" value={vendorData.name} onChange={handleChange} placeholder="Name" className='update-form-grp' />
//                                     <input name="organization_name" value={vendorData.organization_name} onChange={handleChange} placeholder="Organization" className='update-form-grp' />
//                                     <input name="role_name" value={vendorData.role_name} onChange={handleChange} placeholder="Role" className='update-form-grp' />
//                                     <input name="service_name" value={vendorData.service_name} onChange={handleChange} placeholder="Service" className='update-form-grp' />
//                                     <input name="phone" value={vendorData.phone} onChange={handleChange} placeholder="Phone" className='update-form-grp' />
//                                     <input name="email" value={vendorData.email} onChange={handleChange} placeholder="Email" className='update-form-grp' />
//                                     <br />
//                                     <button type="button" onClick={handleUpdateClick} className='form-btn'>Update</button>
//                                     <button type="button" onClick={() => setEditingVendor(null)} className='cancel-btn'>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 {showModal && (
//                     <Modal closeModal={() => setShowModal(false)} fetchVendors={fetchVendors} />
//                 )}
//             </div>
      
//         </div>
//     );
// };

// export default AdminVendorList;





// import React, { useEffect, useState } from 'react';
// import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"
// import "./AdminVendorList.css";
// import axios from 'axios';

// const AdminVendorList = ({searchQuery}) => {
//     const [vendors, setVendors] = useState([]);
//     const [editingVendor, setEditingVendor] = useState(null);
//     const [vendorData, setVendorData] = useState({
//         name: '',
//         organization_name: '',
//         role_name: '',
//         service_name: '',
//         phone: '',
//         email: ''
//     });

//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     const fetchVendors = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/');
//             setVendors(response.data);
//         } catch (error) {
//             console.error('Error fetching vendors:', error);
//         }
//     };

//     const handleUpdateClick = async (vendorId, vendorData) => {
//         try {
//             await axios.put(`http://localhost:8000/vendors/${editingVendor}`, vendorData);
//             fetchVendors();
//         } catch (error) {
//             console.error('Error updating vendor:', error);
//         }
//     };

//     const handleDeleteClick = async (vendorId) => {
//         try {
//             await axios.delete(`http://localhost:8000/vendors/${vendorId}`);
//             fetchVendors();
//         } catch (error) {
//             console.error('Error deleting vendor:', error);
//         }
//     };

//     const handleEditClick = (vendor) => {
//         setEditingVendor(vendor.vendor_id);
//         setVendorData({
//             name: vendor.name,
//             organization_name: vendor.organization_name,
//             role_name: vendor.role_name,
//             service_name: vendor.service_name,
//             phone: vendor.phone,
//             email: vendor.email
//         });
//     };

 

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setVendorData(prevData => ({ ...prevData, [name]: value }));
//     };

//     // Filter students based on the search query
//      const filteredVendors = vendors.filter((vendor) =>
//          vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
//      );

//     return (
//         <div>
//         <div className='table-wrapper'>
//             {/* <h1>Admin Vendor List</h1> */}
//             <table className='table'>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th className='expand'>Name</th>
//                         <th>Organization</th>
//                         <th>Role</th>
//                         <th>Service</th>
//                         <th>Phone</th>
//                         <th>Email</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredVendors.map(vendor => (
//                         <tr key={vendor.vendor_id}>
//                             <td >{vendor.vendor_id}</td>
//                             <td>{vendor.name}</td>
//                             <td>{vendor.organization_name}</td>
//                             <td>{vendor.role_name}</td>
//                             <td>{vendor.service_name}</td>
//                             <td>{vendor.phone}</td>
//                             <td>{vendor.email}</td>
//                             <td>
//                                 <span className='actions'>
//                                     <BsFillPencilFill onClick={() => handleEditClick(vendor)}/>
//                                     <BsFillTrashFill className="delete-btn" onClick={() => handleDeleteClick(vendor.vendor_id)}/>
//                                 </span>
//                              </td>
                           
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {editingVendor && (
//                 <div className='vendor-update'>
//                     <div className='update-form'>
//                     <h2>Edit Vendor</h2>
//                     <br/>
//                     <form>
//                         <div className='update-form-gr'>
//                         <input name="name" value={vendorData.name} onChange={handleChange} placeholder="Name" className='update-form-grp '/>
//                         <input name="organization_name" value={vendorData.organization_name} onChange={handleChange} placeholder="Organization " className='update-form-grp ' />
//                         <input name="role_name" value={vendorData.role_name} onChange={handleChange} placeholder="Role" className='update-form-grp ' />
//                         <input name="service_name" value={vendorData.service_name} onChange={handleChange} placeholder="Service" className='update-form-grp '/>
//                         <input name="phone" value={vendorData.phone} onChange={handleChange} placeholder="Phone" className='update-form-grp '/>
//                         <input name="email" value={vendorData.email} onChange={handleChange} placeholder="Email" className='update-form-grp '/>
//                         <br/>
//                         <button type="button" onClick={handleUpdateClick} className='form-btn'>Update</button>
//                         <button type="button" onClick={() => setEditingVendor(null)} className='cancel-btn'>Cancel</button>
//                         </div>
//                     </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//         </div>
//     );
// };

// export default AdminVendorList;