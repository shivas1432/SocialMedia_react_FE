import '../css/feed.css';
 // Import Link for navigation


const Feed = () => {
    return (
        <div>
           <h2>Welcome to the Social Media App</h2>
            <div className="navigation">
            
    
    <a href="/login" className="nav-link">Login</a> | 
    <a href="/register" className="nav-link">Create Account</a>

            </div>
            <div className="video-container">
                <video
                    src="/media.mp4" // Replace with the actual video path
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="background-video"
                />
            </div>
        </div>
    );
};

export default Feed;
