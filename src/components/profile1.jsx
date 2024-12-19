import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/profile1.css'; // Import your CSS file for styles

const Profile = () => {
    const [file, setFile] = useState(null);
    const [nickname, setNickname] = useState('');
    const [tags, setTags] = useState('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const email = 'user@example.com'; // Replace with logic to get the logged-in user's email
            try {
                const response = await axios.get(`http://localhost:8081/api/profile/${email}`);
                const { nickname, tags, bio, profilePicture } = response.data;

                setNickname(nickname);
                setTags(tags);
                setBio(bio);

                // Set the profile picture if it exists
                if (profilePicture) {
                    setFile(profilePicture); // Assuming profilePicture contains a URL
                }
            } catch (error) {
                console.error('', error);
                setMessage('');
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!nickname) {
            setMessage('Please provide a nickname.');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('profilePicture', file);
        }
        formData.append('nickname', nickname);
        formData.append('tags', tags);
        formData.append('bio', bio);

        try {
            const email = 'user@example.com'; // Replace with actual user email retrieval logic
            formData.append('Email', email); // Use 'Email' with a capital 'E'

            const response = await axios.post('http://localhost:8081/api/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
            navigate('/feed1'); // Navigate to the feed page after successful update
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile. Please try again.');
        }
    };

    return (
        <div className="profile-container">
            <h1>Edit Profile</h1>
            <div className="image-circle1">
                {file ? (
                    <img src={URL.createObjectURL(file)} alt="Profile" />
                ) : (
                    <div>No image selected</div>
                )}
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <div className='button-container'>
                <button onClick={handleSubmit}>Go Ahead</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Profile;
