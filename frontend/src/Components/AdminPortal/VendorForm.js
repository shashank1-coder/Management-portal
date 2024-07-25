import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorForm = ({ selectedVendor, onSave }) => {
    const [vendorData, setVendorData] = useState({
        name: '',
        organization: '',
        role: '',
        service: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        if (selectedVendor) {
            setVendorData({
                name: selectedVendor.name || '',
                organization: selectedVendor.organization || '',
                role: selectedVendor.role || '',
                service: selectedVendor.service || '',
                phone: selectedVendor.phone || '',
                email: selectedVendor.email || '',
            });
        }
    }, [selectedVendor]);

    const handleChange = (e) => {
        setVendorData({
            ...vendorData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedVendor) {
                // Update vendor
                await axios.put(`http://localhost:8000/vendors/${selectedVendor.vendor_id}`, vendorData);
            } else {
                // Create new vendor
                await axios.post('http://localhost:8000/vendors/', vendorData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving vendor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={vendorData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Organization:</label>
                <input type="number" name="organization" value={vendorData.organization} onChange={handleChange} required />
            </div>
            <div>
                <label>Role:</label>
                <input type="number" name="role" value={vendorData.role} onChange={handleChange} required />
            </div>
            <div>
                <label>Service:</label>
                <input type="number" name="service" value={vendorData.service} onChange={handleChange} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" name="phone" value={vendorData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={vendorData.email} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default VendorForm;
