import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendOtp = () => {
    if (!email) {
      alert('Please enter an email address.');
    } else if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpSent(true);
      alert(`Your OTP is: ${otp}`); // Simulate sending OTP
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      navigate('/form'); // Redirect to form
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">Login with OTP</h2>

        {!otpSent ? (
          <>
            <label className="block mb-2 font-medium text-white">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={sendOtp}
              disabled={!isValidEmail(email)}
              className={`w-full ${
                isValidEmail(email)
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-300 cursor-not-allowed'
              } transition-colors duration-300 text-white py-2 rounded shadow-md`}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p className="text-white mb-4">OTP sent to <strong>{email}</strong></p>
            <label className="block mb-2 font-medium text-white">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={e => setEnteredOtp(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-2 rounded shadow-md"
            >
              Verify OTP
            </button>
            <button
              onClick={() => {
                setOtpSent(false);
                setGeneratedOtp('');
                setEnteredOtp('');
              }}
              className="w-full mt-3 text-sm text-white underline hover:text-white/80 transition"
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
