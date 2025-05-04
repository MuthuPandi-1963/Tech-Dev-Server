const SendCookie = (res, token) => {
    console.log(token);

    res.cookie("token", token, {
        httpOnly: true, // Correct casing for httpOnly
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Allows cross-origin cookies
        // path: '/', // Cookie path
        domain: process.env.NODE_ENV === 'production' ? "tech-dev-server.onrender.com" : "localhost" // Hostname only, no protocol
    });

    return token;
};

export default SendCookie;
