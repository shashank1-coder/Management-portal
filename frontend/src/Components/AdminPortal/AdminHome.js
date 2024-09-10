import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css'; // Import the CSS file for styling
import {api_url} from '../../config'

const AdminHome = () => {
    const [totalVendors, setTotalVendors] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const [totalOrgs, setTotalOrgs] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [vendors, setVendors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const fetchTotalVendors = async () => {
        try {
            const response = await axios.get(`${api_url}/vendors/count`);
            setTotalVendors(response.data.total_vendors);
        } catch (error) {
            setError('Error fetching total vendors');
        } finally {
            setLoading(false);
        }
    };


    const fetchTotalServices = async () => {
        try {
            const response = await axios.get(`${api_url}/services/count`);
            setTotalServices(response.data.total_services);
        } catch (error) {
            setError('Error fetching total services');
        } finally {
            setLoading(false);
        }
    };


    const fetchTotalOrgs = async () => {
        try {
            const response = await axios.get(`${api_url}/organizations/count`);
            setTotalOrgs(response.data.total_organizations);
        } catch (error) {
            setError('Error fetching total organizations');
        } finally {
            setLoading(false);
        }
    };

    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get(`${api_url}/users/count`);
            setTotalUsers(response.data.total_users);
        } catch (error) {
            setError('Error fetching total users');
        } finally {
            setLoading(false);
        }
    };

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${api_url}/`);
            setVendors(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    useEffect(() => {

        fetchTotalVendors();
        fetchTotalOrgs();
        fetchTotalServices();
        fetchTotalUsers();
        fetchVendors();
    }, []);

   



    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return ( 
        
<div className='admin-home'>        

<div className='cardBox'>

<div class="card ">
  <div class="card-body">
  <div class="cardName">Vendors</div>
    <p class=" numbers" >     <i className="bi bi-people-fill me-4"></i> {totalVendors}</p>
    <a href="/Vendors" class="btn btn-primary"> See All</a>
  </div>
</div>



<div class="card ">
  <div class="card-body">
    <div className='cardName'>Services</div>
    <p class="numbers">  <i className="bi bi-card-checklist me-4"></i>{totalServices}</p>
    <a href="/Services" class="btn btn-primary">See All</a>
  </div>
</div>

<div class="card ">
  <div class="card-body">
    <div className='cardName'>Organizations</div>
    <p class="numbers">  <i className="bi bi-building me-4" ></i>{totalOrgs} </p>
    <a href="/Organizations" class="btn btn-primary">See All</a>
  </div>
</div>

<div class="card ">
  <div class="card-body">
    <div className='cardName'>Users</div>
    <p class="numbers"> <i className="bi bi-person me-4" ></i>{totalUsers}</p>
    <a href="/Users" class="btn btn-primary">See All</a>
  </div>
</div>
</div>

<h2 style={{marginLeft:"2%"}}>Recent Order</h2>
<br/>
<div className='home-recent-table'>
<table className='home-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='expand'>Name</th>
                            <th>Organization</th>
                            <th>Role</th>
                            <th>Service</th>
                            <th>Phone</th>
                            <th>Email</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor.vendor_id}>
                                <td>{vendor.vendor_id}</td>
                                <td>{vendor.name}</td>
                                <td>{vendor.organization_name}</td>
                                <td>{vendor.role_name}</td>
                                <td>{vendor.service_name}</td>
                                <td>{vendor.phone}</td>
                                <td>{vendor.email}</td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>


</div>

</div>

    );
};

export default AdminHome;



