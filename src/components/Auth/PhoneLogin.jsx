// src/components/Auth/PhoneLogin.jsx
import React, { useState } from 'react';
import { signInWithPhone, auth } from '../../firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import './Auth.css';

const PhoneLogin = ({ onSuccess, onSwitchToEmail }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      alert('Please enter phone number');
      return;
    }

    try {
      setIsLoading(true);
      setupRecaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${phoneNumber}`; // India ke liye +91
      
      const result = await signInWithPhone(formattedPhone, appVerifier);
      setConfirmationResult(result);
      alert('OTP sent successfully!');
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!verificationCode) {
      alert('Please enter OTP');
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await confirmationResult.confirm(verificationCode);
      const user = userCredential.user;
      
      onSuccess({
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        name: 'Customer' // Default name
      });
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login with Phone</h2>
      
      {!confirmationResult ? (
        <>
          <div className="input-group">
            <label>Phone Number (+91)</label>
            <input
              type="tel"
              placeholder="Enter 10 digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength="10"
            />
          </div>
          
          <div id="recaptcha-container"></div>
          
          <button 
            onClick={handleSendOTP} 
            disabled={isLoading || phoneNumber.length !== 10}
            className="auth-button"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      ) : (
        <>
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
            />
          </div>
          
          <button 
            onClick={handleVerifyOTP} 
            disabled={isLoading || verificationCode.length !== 6}
            className="auth-button"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      <p className="auth-switch">
        <span onClick={onSwitchToEmail}>Login with Email instead</span>
      </p>
    </div>
  );
};

export default PhoneLogin;