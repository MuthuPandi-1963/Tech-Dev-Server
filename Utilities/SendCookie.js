const SendCookie = (res,token)=>{
    console.log(token);
    
    res.cookie("token",token,{
        HttpOnly :true,
        secure :process.env.NODE_ENV === 'production',
        maxAge : 7 * 24 * 60 * 60 * 1000 ,
        sameSite : 'None',
        path : '/',
        domain : process.env.NODE_ENV === 'production' ? "https://tech-dev-server.onrender.com" : "http://localhost:3000"
    })
    return token
}
export default SendCookie;
