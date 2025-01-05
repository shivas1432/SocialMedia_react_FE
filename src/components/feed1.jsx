import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/feed1.css';
import backgroundImage from '../assets/images/background.jpeg';
import backgroundImage1 from '../assets/images/deafult.png';

const Feed1 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userEmail } = location.state || {}; // Extract email from route state

    const [userDetails, setUserDetails] = useState({
        username: '',
        nickname: '',
        bio: '',
        tags: '',
        profilePicture: '', // Initialize profilePicture
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Memoized function to fetch user details
    const fetchUserDetails = useCallback(async () => {
        if (!userEmail) {
            console.error('No email provided');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8081/api/user', {
                params: { email: userEmail }, // Pass email as query parameter
            });

            if (response.data) {
                const { Username, Nickname, Tags, Bio, ProfilePicture } = response.data;

                // Log the received data for debugging purposes
                console.log('Received user details:', response.data);

                
                const profilePictureUrl = ProfilePicture && ProfilePicture.startsWith('http')
                    ? ProfilePicture 
                    : `http://localhost:8081/uploads/${ProfilePicture}?t=${new Date().getTime()}`; // Append base URL if not a full URL

                // Log the user details before setting state
                console.log('Setting state with user details:', {
                    username: Username || 'N/A',
                    nickname: Nickname || 'N/A',
                    tags: Tags || 'N/A',
                    bio: Bio || 'N/A',
                    profilePicture: profilePictureUrl, 
                });

                // Update userDetails state
                setUserDetails({
                    username: Username || 'N/A',
                    nickname: Nickname || 'N/A',
                    tags: Tags || 'N/A',
                    bio: Bio || 'N/A',
                    profilePicture: profilePictureUrl, 
                });
            } else {
                console.error('No data received from backend');
            }
        } catch (err) {
            console.error('Error fetching user details:', err.response?.data || err.message);
        }
    }, [userEmail]);

    // Memoized function to fetch posts
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8081/api/posts?page=${currentPage}`);
            const newPosts = response.data;
            setPosts((prevPosts) => [
                ...prevPosts,
                ...newPosts.filter(post => !prevPosts.some(p => p.Unnamed === post.Unnamed)),
            ]);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    // Fetch data when component mounts
    useEffect(() => {
        fetchUserDetails();
        fetchPosts();
    }, [fetchUserDetails, fetchPosts]);

    // Paginate displayed posts
    const displayedPosts = posts.slice((currentPage - 1) * 2, currentPage * 2);

    // Load more posts
    const loadMorePosts = () => {
        setCurrentPage((prev) => prev + 1);
    };

    // Handle logout
    const handleLogout = () => {
        navigate('/login');
    };

    // Show loading state
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // Show error state
    if (error) {
        return <div className="error">{error}</div>;
    }

    // Log the userDetails state for debugging purposes
    console.log('User details state:', userDetails);

    return (
        <div className="display" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className="heading">Welcome to Media Posts</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <div className="feed-page">
                {/* User Info Section */}
                <div className="user-info">
                    <button className="edit-button" onClick={() => navigate('/profile')}>
                        Edit
                    </button>
                    <div className="profile-container1">
                        <div className="profile-picture-wrapper">
                            <div className="profile-picture">
                                <img
                                    src={userDetails.profilePicture}
                                    alt={`${userDetails.username}'s profile`}
                                    onError={(e) => {
                                        e.target.src = backgroundImage1; // Fallback to background.jpeg if the image fails to load
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bio">
                            {/* Displaying nickname, tags, and bio */}
                            <h2 className="nickname">Nickname: {userDetails.nickname}</h2>
                            <h2 className="tags">Tags: {userDetails.tags}</h2>
                            <h2 className="bio">Bio: {userDetails.bio}</h2>
                        </div>
                    </div>
                </div>

                {/* Feed Section */}
                <div className="feed-container1">
                    {displayedPosts.length === 0 ? (
                        <div>No posts available</div>
                    ) : (
                        displayedPosts.map((post) => (
                            <div key={post.Unnamed} className="feed-post1">
                                <h3>{post.User} ({post.Platform})</h3>
                                <p>{post.Text}</p>
                                <p><strong>Sentiment:</strong> {post.Sentiment}</p>
                                <p><strong>Timestamp:</strong> {new Date(post.Timestamp).toLocaleString()}</p>
                                <p><strong>Hashtags:</strong> {post.Hashtags}</p>
                                <div className="engagement1">
                                    <span>Retweets: {post.Retweets}</span> | 
                                    <span>Likes: {post.Likes}</span>
                                </div>
                                <p><strong>Location:</strong> {post.Country}</p>
                                <p><strong>Date:</strong> {`${post.Year}-${post.Month}-${post.Day} ${post.Hour}:00`}</p>
                            </div>
                        ))
                    )}
                    {posts.length > displayedPosts.length && (
                        <button onClick={loadMorePosts} className="load-more">
                            Load More Posts
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feed1;
