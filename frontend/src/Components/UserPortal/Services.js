import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import ServiceModal from '../Modals/ServiceModal';
import axios from 'axios';
import '../AdminPortal/AdminServices.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [serviceData, setServiceData] = useState({
        service_name: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/services/');
            setServices(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const handleUpdateClick = async () => {
        try {
            await axios.put(`http://localhost:8000/services/${editingService}`, serviceData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchServices();
            setEditingService(null);
        } catch (error) {
            console.error('Error updating organization name:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
        }
    };

    const handleDeleteClick = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:8000/services/${serviceId}`);
            fetchServices();
            toast.success('Service deleted successfully!')
        } catch (error) {
            toast.error('Error deleting Service.');
        }
    };

    const handleEditClick = (service) => {
        setEditingService(service.service_id);
        setServiceData({
            service_name: service.service_name,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData(prevData => ({ ...prevData, [name]: value }));
    };
  
    const filteredServices = services.filter((service) => {
        const name = service.service_name;
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

  
      const handleCheckboxChange = (serviceId) => {
        setSelectedServices((prevSelected) => {
            if (prevSelected.includes(serviceId)) {
                return prevSelected.filter(id => id !== serviceId);
            } else {
                return [...prevSelected, serviceId];
            }
        });
    };

    const handleDeleteSelectedClick = async () => {
     
        try {
            await Promise.all(
                selectedServices.map((serviceId) =>
                    axios.delete(`http://localhost:8000/services/${serviceId}`)
                )
            );
            fetchServices();
            setSelectedServices([]);
            toast.success('Service deleted successfully!')
        } catch (error) {
            toast.error('Error deleting Service.');
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedServices([]);
        } else {
            setSelectedServices(filteredServices.map(service => service.service_id));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (selectedServices.length === services.length && services.length !== 0) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedServices, services]);

   // Custom confirmation component for the toast
const ConfirmToast = ({ onConfirm, onCancel }) => (
    <div>
        <p>Are you sure you want to delete this Service?</p>
        <div>
            <button onClick={onConfirm} className="toast-confirm-btn me-4">Yes</button>
            <button onClick={onCancel} className="toast-cancel-btn">No</button>
        </div>
    </div>
);

const confirmDelete = (serviceId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteClick(serviceId);
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

const confirmSelectedDelete = (serviceId) => {
    const toastId = toast(
        <ConfirmToast
            onConfirm={() => {
                handleDeleteSelectedClick(serviceId);
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
            <h1>Services List</h1>
            <button className='admin form-btn'  onClick={() => setShowModal(true)}>Add <i class=" bi bi-person-plus-fill " style={{marginLeft:"0.5rem", marginRight:"0.5rem" }}></i></button>           
            <div className ='main-div'>
            <div className='select-options'>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    /> Select All
                    <button className='admin del btn' onClick={confirmSelectedDelete} disabled={selectedServices.length === 0}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            <div className='table-wrapper'>

    
            <table  className='table-data'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th >Service ID</th>
                        <th className='expand-service'>Service Name</th>
                        <th className='expand-service'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {filteredServices.map(service => (
                        <tr key={service.service_id}>
                            <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service.service_id)}
                                        onChange={() => handleCheckboxChange(service.service_id)}
                                    />
                                </td>
                            <td style={{textIndent:"32%"}}>{service.service_id}</td>
                            <td>{service.service_name}</td>
                            <td>
                                    <span className='actions'>
                                        <BsFillPencilFill onClick={() => handleEditClick(service)} />
                                        <BsFillTrashFill className="ms-4 delete-btn" onClick={() => confirmDelete(service.service_id)} />
                                    </span>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>

            {editingService && (
                     <div className='vendor-update'>
                     <div className='update-form'>
                         <h2>Edit Service</h2>
                         <form>
                             <div className='update-form-gr'>
                             <input name="service_name" value={serviceData.service_name} onChange={handleChange} placeholder="Service" className='update-form-grp' />                                    <br />
                                 <button type="button" onClick={handleUpdateClick} className='form-btn me-2'>Update</button>
                                 <button type="button" onClick={() => setEditingService(null)} className='cancel-btn'>Cancel</button>
                             </div>
                         </form>
                     </div>
                 </div>
             )}

                {showModal && (
                    <ServiceModal closeModal={() => setShowModal(false)} fetchServices={fetchServices} />
                )}

            </div>
            </div>
            <ToastContainer position="bottom-left"  />
            </div>
       
    );
}

export default Services;