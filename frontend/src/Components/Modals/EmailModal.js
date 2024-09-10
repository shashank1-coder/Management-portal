import React, { useState } from 'react';
import axios from 'axios';
import './EmailModal.css'
import {api_url} from '../../config'
const EmailModal = ({ selectedVendors, closeModal }) => {
    const [emailContent, setEmailContent] = useState('');
    const [subject, setSubject] = useState('');

    const handleContentChange = (e) => {
        setEmailContent(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleSend = async () => {
        try {
            await axios.post(`${api_url}/send-gmail/`, {
                vendor_ids: selectedVendors,
                subject,
                body: emailContent,
            });
            console.log('Email sent successfully');
            closeModal();
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    return (
        <div className="email-modal">
            <div className="email-modal-content">
                <h2>Send Email</h2>
                <input
                    type="text"
                    value={subject}
                    onChange={handleSubjectChange}
                    placeholder="Subject"
                    className="subject-input"
                />
                <textarea
                    value={emailContent}
                    onChange={handleContentChange}
                    placeholder="Type your email here"
                />
                <button onClick={handleSend} className='form-btn me-4'>Send</button>
                <button onClick={closeModal} className='cancel-btn'>Cancel</button>
            </div>
        </div>
    );
};

export default EmailModal;
