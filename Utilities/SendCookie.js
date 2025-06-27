const SendCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Allows cross-site cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    domain: process.env.NODE_ENV === 'production' ? 'https://tech-dev-server.onrender.com' : 'localhost',
  });

  return token;
};

export default SendCookie;
