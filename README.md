# Social Media Frontend

A modern React-based social media web application with user authentication, profile management, and social features. This was my first React project, built for learning modern web development.

## Overview

This frontend application provides a complete social media experience with user registration, authentication, profile customization, and post viewing capabilities. Originally planned as a combined social media and chat application, it was split into separate projects for focused learning.

## Features

### User Authentication
- User registration and login
- JWT token-based authentication
- Secure session management
- Token expiration handling

### Profile Management
- Edit user nickname and bio
- Add personal tags
- Profile picture upload
- Real-time profile updates

### Social Features
- View and browse posts
- Pagination for smooth browsing
- Responsive post loading
- Interactive user interface

### Technical Features
- Modern React architecture
- Component-based design
- Responsive mobile-first layout
- API integration with backend

## Tech Stack

- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **JWT** - Token-based authentication
- **CSS3** - Custom styling and responsive design

## Quick Start

```bash
# Clone the repository
git clone https://github.com/shivas1432/Socialmedia_react_FE.git

# Navigate to project
cd Socialmedia_react_FE

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000` to view the application.

## Prerequisites

- Node.js and npm installed
- Backend API running at `http://localhost:8081`
- Modern web browser

## Project Structure

```
src/
├── components/          # Reusable UI components
├── css/                # Styling files
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Configuration

### Environment Setup
Create a `.env` file for API configuration:

```env
REACT_APP_API_URL=http://localhost:8081
```

### Backend Integration
Ensure the backend API is running for full functionality:
- User authentication endpoints
- Profile management APIs
- Post retrieval services

## Key Features Breakdown

### Authentication Flow
1. User registration with form validation
2. Login with JWT token storage
3. Automatic token refresh handling
4. Secure logout functionality

### Profile Management
- Edit personal information
- Upload and update profile pictures
- Manage user tags and bio
- Real-time profile preview

### Post System
- Browse posts with pagination
- Smooth loading animations
- Responsive post display
- Interactive user engagement

## API Integration

The frontend communicates with the backend through:
- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /api/user` - Fetch user details
- `POST /api/profile/update` - Update profile
- `GET /api/posts` - Retrieve posts with pagination

## Development

### Scripts
```bash
npm start      # Start development server
npm build      # Build for production
npm test       # Run tests
```

### Styling
- Custom CSS for responsive design
- Mobile-first approach
- Modern UI/UX patterns
- Accessible design principles

## Learning Objectives

This project was built to practice:
- React fundamentals and hooks
- Component lifecycle management
- State management
- API integration
- Authentication handling
- Responsive design
- Modern JavaScript (ES6+)

## Troubleshooting

### Common Issues
- **CORS Errors**: Ensure backend CORS is configured for `http://localhost:3000`
- **Token Expiration**: Check JWT token handling in authentication flow
- **API Connection**: Verify backend is running on port 8081

### Development Tips
- Use browser developer tools for debugging
- Check console for error messages
- Verify API endpoints are accessible
- Ensure proper environment variable setup

## Future Enhancements

Planned features for future iterations:
- Real-time chat functionality (separate project)
- Enhanced post creation
- Social interactions (likes, comments)
- Advanced profile customization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a learning project showcasing React fundamentals and modern web development practices.
