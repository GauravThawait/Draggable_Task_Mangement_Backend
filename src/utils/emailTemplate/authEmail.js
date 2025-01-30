const sendEmailOtpTemplate = (name, otp) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
        <p style="font-size: 16px; color: #555;">Dear ${name},</p>
        <p style="font-size: 16px; color: #555;">We received a request to reset your password. Please use the OTP below to proceed:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; color: #007bff; font-weight: bold;">${otp}</span>
        </div>
        <p style="font-size: 16px; color: #555;">This OTP is valid for 10 minutes. If you didn’t request this, please ignore this email.</p>
        <p style="font-size: 16px; color: #555;">Best regards,</p>
        <p style="font-size: 16px; color: #555;"><strong>Your App Team</strong></p>
        <div style="text-align: center; margin-top: 20px;">
          <img src="${process.env.SERVER_URL}/api/v1/image" alt="bitcrackers_logo" style="width: 120px; height: auto;" />
        </div>
      </div>
    `;
  };
  
  export { sendEmailOtpTemplate };
  