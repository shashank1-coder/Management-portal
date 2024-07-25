import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Organizations() {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/organizations/');
                setOrganizations(response.data);
            } catch (error) {
                console.error('Error fetching Organizations:', error);
            }
        };

        fetchOrganizations();
    }, []);

    return (
        <div className='main-content'>
            <h1 style={{fontSize:"40px"}}>Organizations List</h1>
            <br></br>
            <div className='std-body'>
             <div className='table-data'>
            <table>
                <thead>
                    <tr>
                        <th style={{fontSize:"25px", paddingRight:"50px"}}>Std ID</th>
                        <br></br>
                        <th style={{fontSize:"25px"}}>Organization Name</th>
                    </tr>
                </thead>
                <tbody>
                    {organizations.map((organization, index) => (
                        <tr key={organization.organization_id || index}>
                            <td>{organization.organization_id}</td>
                            <br></br>
                            <td>{organization.organization_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
}

export default Organizations;


