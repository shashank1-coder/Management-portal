import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/services/');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className='main-content'>
            <h1>Services List</h1>
            <div className='std-body'>

            <div className='table-data'>
            <table>
                <thead>
                    <tr>
                        <th style={{paddingRight:"30px"}}>Service ID</th>
                       
                        <th>Service Name</th>
                    </tr>
                </thead>
                <tbody>
                {services.map(service => (
                        <tr key={service.service_id}>
                            <td>{service.service_id}</td>
                            <td>{service.service_name}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            </div>
                    </div>
        </div>
    );
}

export default Services;
