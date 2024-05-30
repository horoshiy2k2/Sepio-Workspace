import React, { useState } from 'react';
import axios from 'axios';

const HttpRequestForm = () => {
    const [requestData, setRequestData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Відправка реквеста на внутрішній API 
            const response = await axios.post('/api/send-request', requestData);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const handleChange = (e) => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="param1"
                placeholder="Parameter 1"
                value={requestData.param1 || ''}
                onChange={handleChange}
            />
            <input
                type="text"
                name="param2"
                placeholder="Parameter 2"
                value={requestData.param2 || ''}
                onChange={handleChange}
            />
            <button type="submit">Send Request</button>
        </form>
    );
};

export default HttpRequestForm;
