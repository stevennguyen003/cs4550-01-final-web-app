import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../User/client';

function CreateAccount() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        dob: '', 
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createUser({
                ...formData,
                dob: new Date(formData.dob), // check node to see if need to convert to date
            });
            console.log('User created:', response);
            navigate('/profile'); // Adjust the route as necessary
        } catch (err) {
            setError('Failed to create account. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="create-account-body">
            <div className="create-account-box">
                <h1 className="create-account-header">Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                {error && <div className="error">{error}</div>}
                <Link to="/">Already have an account?</Link>
            </div>
        </div>
    );
}

export default CreateAccount;
