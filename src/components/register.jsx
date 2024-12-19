import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/register.css'; // Optional: for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [profileData, setProfileData] = useState({
        file: null,
        nickname: '',
        tags: '',
        bio: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!profileData.nickname) newErrors.nickname = 'Nickname is required';
        if (!profileData.file) newErrors.file = 'Profile picture is required';
        return newErrors;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            setErrors({});
            setSuccessMessage('');

            const data = new FormData();
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('nickname', profileData.nickname);
            data.append('tags', profileData.tags);
            data.append('bio', profileData.bio);
            data.append('profilePicture', profileData.file);

            try {
                const response = await axios.post('http://localhost:8081/api/register/upload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Registration successful:', response.data);
                setSuccessMessage('Registration successful!');
                // Reset form fields
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setProfileData({
                    file: null,
                    nickname: '',
                    tags: '',
                    bio: ''
                });
                navigate('/login');
            } catch (error) {
                console.error('Error during registration:', error.response?.data?.error || error.message);
                setErrors({
                    server: error.response?.data?.error || 'An error occurred. Please try again.'
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="registration-container">
            <h2>Register for Social Media</h2>
            {successMessage && <p className="success-text">{successMessage}</p>}
            <form onSubmit={handleRegisterSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errors.username && <p className="error-text">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>

                <h2>Add Profile</h2>
                <div className="image-circle">
                    {profileData.file ? (
                        <img src={URL.createObjectURL(profileData.file)} alt="Profile" />
                    ) : (
                        <div>No image selected</div>
                    )}
                </div>
                <input type="file" accept="image/*" onChange={(e) => setProfileData({ ...profileData, file: e.target.files[0] })} />
                {errors.file && <p className="error-text">{errors.file}</p>}
                <input
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    value={profileData.nickname}
                    onChange={handleProfileChange}
                />
                {errors.nickname && <p className="error-text">{errors.nickname}</p>}
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    value={profileData.tags}
                    onChange={handleProfileChange}
                />
                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                {errors.server && <p className="error-text">{errors.server}</p>}
            </form>
            <div className="login-redirect">
                <p>Have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
