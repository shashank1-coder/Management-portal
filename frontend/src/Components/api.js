import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:8000'; // Update with your API base URL

// Vendors
export const getAllVendors = () => axios.get(`${API_BASE_URL}/`);
export const createVendor = (vendorData) => axios.post(`${API_BASE_URL}/vendors/`, vendorData);
export const getVendor = (vendorId) => axios.get(`${API_BASE_URL}/vendors/${vendorId}`);
export const updateVendor = (vendorId, vendorData) => axios.put(`${API_BASE_URL}/vendors/${vendorId}`, vendorData);
export const deleteVendor = (vendorId) => axios.delete(`${API_BASE_URL}/vendors/${vendorId}`);

// Vendors by criteria
export const getVendorsByServiceId = (serviceId) => axios.get(`${API_BASE_URL}/vendors/by_service/${serviceId}`);
export const getVendorsByRoleId = (roleId) => axios.get(`${API_BASE_URL}/vendors/by_role/${roleId}`);
export const getVendorsByOrganizationId = (organizationId) => axios.get(`${API_BASE_URL}/vendors/by_organization/${organizationId}`);

// Organizations
export const createOrganization = (orgData) => axios.post(`${API_BASE_URL}/organizations/`, orgData);
export const getOrganization = (orgId) => axios.get(`${API_BASE_URL}/organizations/${orgId}`);
export const getAllOrganizations = () => axios.get(`${API_BASE_URL}/organizations/`);
export const updateOrganization = (orgId, orgData) => axios.put(`${API_BASE_URL}/organizations/${orgId}`, orgData);
export const deleteOrganization = (orgId) => axios.delete(`${API_BASE_URL}/organizations/${orgId}`);

// Roles
export const createRole = (roleData) => axios.post(`${API_BASE_URL}/roles/`, roleData);
export const getRole = (roleId) => axios.get(`${API_BASE_URL}/roles/${roleId}`);
export const getAllRoles = () => axios.get(`${API_BASE_URL}/roles/`);
export const updateRole = (roleId, roleData) => axios.put(`${API_BASE_URL}/roles/${roleId}`, roleData);
export const deleteRole = (roleId) => axios.delete(`${API_BASE_URL}/roles/${roleId}`);

// Services
export const createService = (serviceData) => axios.post(`${API_BASE_URL}/services/`, serviceData);
export const getService = (serviceId) => axios.get(`${API_BASE_URL}/services/${serviceId}`);
export const getAllServices = () => axios.get(`${API_BASE_URL}/services/`);
export const updateService = (serviceId, serviceData) => axios.put(`${API_BASE_URL}/services/${serviceId}`, serviceData);
export const deleteService = (serviceId) => axios.delete(`${API_BASE_URL}/services/${serviceId}`);

// Email
export const sendEmail = (emailData) => axios.post(`${API_BASE_URL}/send-email/`, emailData);
