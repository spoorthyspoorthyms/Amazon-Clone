// src/pages/ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP, 3 = reset password

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOTP = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((u) => u.email === email);
    if (!userExists) {
      toast.error('❌ Email not found');
      return;
    }

    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    setOtpSent(true);
    setTimer(60);
    setCanResend(false);
    setStep(2);

    // Optional: Send via EmailJS (if you have set it up)
    // emailjs.send(...) — configure with template

    toast.success(`📩 OTP sent to your email! (Simulated: ${newOTP})`);
  };

  const handleVerifyOTP = () => {
    if (otp === generatedOTP) {
      toast.success('✅ OTP verified!');
      setStep(3);
    } else {
      toast.error('❌ Incorrect OTP');
    }
  };

  const handleResetPassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success('🔐 Password updated successfully!');
    setStep(1);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setOtpSent(false);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h3>🔐 Forgot Password</h3>

      {/* Step 1: Email */}
      {step === 1 && (
        <>
          <input
            type="email"
            className="form-control my-3"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleSendOTP}>
            Send OTP
          </button>
        </>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <>
          <p className="text-muted">⏳ Enter the 6-digit OTP sent to your email</p>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-success w-100 mb-2" onClick={handleVerifyOTP}>
            Verify OTP
          </button>

          {canResend ? (
            <button className="btn btn-link text-primary" onClick={handleSendOTP}>
              🔄 Re-send OTP
            </button>
          ) : (
            <p className="text-muted text-center">Resend in {timer} seconds</p>
          )}
        </>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-sm position-absolute top-0 end-0 mt-1 me-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈 Hide' : '👁 Show'}
            </button>
          </div>
          <button className="btn btn-primary w-100" onClick={handleResetPassword}>
            Save New Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
