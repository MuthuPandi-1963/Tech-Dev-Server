const WelcomePage = (username, email, otp) => `
<body>
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06); font-family: Arial, sans-serif;">
        <!-- Header -->
        <div style="background-color: #0044cc; padding: 30px 20px; text-align: center; color: #ffffff;">
        <h1 style="font-size: 28px; margin: 0; font-weight: 600;">Welcome to Gadgets Heaven</h1>
        <div style="margin-bottom: 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="black" viewBox="0 0 16 16">
                <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
            </svg>
        </div>
        </div>
        <!-- Image Section -->
        <!--  <div style="text-align: center; margin-top: 20px;">
            <img src="INSERT_IMAGE_URL_HERE" alt="Technology Gadgets" style="width: 100%; max-width: 400px; border-radius: 8px;">
        </div> -->
        <!-- Content -->
        <div style="padding: 30px 20px; text-align: center;color:black;">
            <h2 style="font-size: 24px; color: #0044cc; margin-bottom: 10px;">Hi ${username},</h2>
            <p style="font-size: 16px; line-height: 1.6; margin: 10px 0;">We’re excited to welcome you to <strong>Gadgets Heaven</strong>, your one-stop destination for the latest gadgets and technology!</p>
            <p style="font-size: 16px; line-height: 1.6; margin: 10px 0;">Your registered email is: <span style="font-weight: 600; color: #333;">${email}</span></p>
            <p style="font-size: 16px; line-height: 1.6; margin: 10px 0;">Our team is dedicated to bringing you the best products, updates, and offers tailored just for you.</p>
            
            <!-- OTP Section -->
            <div style="margin: 20px 0; text-align: center;">
                <p style="font-size: 16px; margin: 10px 0;">Your One-Time Password (OTP) is:</p>
                <div style="display: inline-flex; align-items: center; background-color: #f4f4f4; padding: 10px 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <span id="otp-code" style="font-size: 18px; font-weight: bold; color: #0044cc; margin-right: 10px;">${otp}</span>
                    
                </div>
                <p style="font-size: 12px; color: #666; margin: 5px 0;">Use this OTP to complete your verification process.</p>
            </div>
        </div>
        <!-- Footer -->
        <div style="background-color: #f4f4f4; text-align: center; padding: 15px 20px; font-size: 14px; color: #666;">
            <p style="margin: 0;">&copy; 2024 Gadgets Heaven. All rights reserved.</p>
            <p style="margin: 10px 0;">
                <a href="#" style="color: #0044cc; text-decoration: none;">Contact Us</a> | 
                <a href="#" style="color: #0044cc; text-decoration: none;">Privacy Policy</a> | 
                <a href="#" style="color: #0044cc; text-decoration: none;">Unsubscribe</a>
            </p>
        </div>
    </div>
    <script>
        document.getElementById('copy-otp-btn').addEventListener('click', function() {
            const otp = document.getElementById('otp-code').innerText;
            navigator.clipboard.writeText(otp).then(() => {
                alert('OTP copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy OTP: ', err);
            });
        });
        function handleCopy() {
            const otp = document.getElementById('otp-code').innerText;
            navigator.clipboard.writeText(otp).then(() => {
                alert('OTP copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy OTP: ', err);
            });
        }
    </script>
    </body>
`;

export default WelcomePage;
