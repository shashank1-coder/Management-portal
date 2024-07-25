import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file for styling

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
            const response = await axios.get('http://localhost:8000/vendors/count');
            setTotalVendors(response.data.total_vendors);
        } catch (error) {
            setError('Error fetching total vendors');
        } finally {
            setLoading(false);
        }
    };


    const fetchTotalServices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/services/count');
            setTotalServices(response.data.total_services);
        } catch (error) {
            setError('Error fetching total services');
        } finally {
            setLoading(false);
        }
    };


    const fetchTotalOrgs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/organizations/count');
            setTotalOrgs(response.data.total_organizations);
        } catch (error) {
            setError('Error fetching total organizations');
        } finally {
            setLoading(false);
        }
    };

    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/count');
            setTotalUsers(response.data.total_users);
        } catch (error) {
            setError('Error fetching total users');
        } finally {
            setLoading(false);
        }
    };

    const fetchVendors = async () => {
        try {
            const response = await axios.get('http://localhost:8000/');
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






// import React from 'react';
// import '../App.css'; // Import the CSS file for styling

// const AdminHome = () => {
//     return ( 
        

//         <div class="cardBox">
//         <div class="card">
//             <div>
//                 <div class="numbers">1,504</div>
//                 <div class="cardName">Daily Views</div>
//             </div>

//             <div class="iconBx">
//                 <ion-icon name="eye-outline"></ion-icon>
//             </div>
//         </div>

//         <div class="card">
//             <div>
//                 <div class="numbers">80</div>
//                 <div class="cardName">Sales</div>
//             </div>

//             <div class="iconBx">
//                 <ion-icon name="cart-outline"></ion-icon>
//             </div>
//         </div>

//         <div class="card">
//             <div>
//                 <div class="numbers">284</div>
//                 <div class="cardName">Comments</div>
//             </div>

//             <div class="iconBx">
//                 <ion-icon name="chatbubbles-outline"></ion-icon>
//             </div>
//         </div>

//         <div class="card">
//             <div>
//                 <div class="numbers">$7,842</div>
//                 <div class="cardName">Earning</div>
//             </div>

//             <div class="iconBx">
//                 <ion-icon name="cash-outline"></ion-icon>
//             </div>
//         </div>
        
//         <div class="details">
//                 <div class="recentOrders">
//                     <div class="cardHeader">
//                         <h2>Recent Services</h2>
//                         <a href="/" class="btn">View All</a>
//                     </div>

//                     <table>
//                         <thead>
//                             <tr>
//                                 <td>Name</td>
//                                 <td>Price</td>
//                                 <td>Payment</td>
//                                 <td>Status</td>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             <tr>
//                                 <td>Star Refrigerator</td>
//                                 <td>$1200</td>
//                                 <td>Paid</td>
//                                 <td><span class="status delivered">Delivered</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Dell Laptop</td>
//                                 <td>$110</td>
//                                 <td>Due</td>
//                                 <td><span class="status pending">Pending</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Apple Watch</td>
//                                 <td>$1200</td>
//                                 <td>Paid</td>
//                                 <td><span class="status return">Return</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Addidas Shoes</td>
//                                 <td>$620</td>
//                                 <td>Due</td>
//                                 <td><span class="status inProgress">In Progress</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Star Refrigerator</td>
//                                 <td>$1200</td>
//                                 <td>Paid</td>
//                                 <td><span class="status delivered">Delivered</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Dell Laptop</td>
//                                 <td>$110</td>
//                                 <td>Due</td>
//                                 <td><span class="status pending">Pending</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Apple Watch</td>
//                                 <td>$1200</td>
//                                 <td>Paid</td>
//                                 <td><span class="status return">Return</span></td>
//                             </tr>

//                             <tr>
//                                 <td>Addidas Shoes</td>
//                                 <td>$620</td>
//                                 <td>Due</td>
//                                 <td><span class="status inProgress">In Progress</span></td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>

//                 </div>


//                 <div class="recentCustomers">
//                     <div class="cardHeader">
//                         <h2>Recent Vendors</h2>
//                     </div>

//                     <table>
//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>David <br/> <span>Italy</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>Amit <br/> <span>India</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>David <br/> <span>Italy</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>Amit <br/> <span>India</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>David <br/> <span>Italy</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>Amit <br/> <span>India</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer01.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>David <br/> <span>Italy</span></h4>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td width="60px">
//                                 <div class="imgBx"><img src="assets/imgs/customer02.jpg" alt=""/></div>
//                             </td>
//                             <td>
//                                 <h4>Amit <br/> <span>India</span></h4>
//                             </td>
//                         </tr>
//                     </table>
//                 </div>

//     </div>






//     );
// };

// export default AdminHome;