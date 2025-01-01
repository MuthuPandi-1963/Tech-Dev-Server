import jwt from 'jsonwebtoken';

// Generate an access token
const CreateToken = (id, role = 'user') => {
    return jwt.sign(
        {
            id,
            role,
            iat: Math.floor(Date.now() / 1000),
            iss: "your-app-name" // Replace with your app's name or domain
        },
        process.env.JWT_KEY,
        { expiresIn: '7d' }
    );
};

// Verify the token with error handling
const VerifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        }
        if (err.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        }
        throw new Error('Token verification failed');
    }
};

// Generate a refresh token
const CreateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
};

export { CreateToken, VerifyToken, CreateRefreshToken };
