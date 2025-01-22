import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

export async function sendVerificationEmail(
  email: string,
  verificationToken: string
) {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL is not set');
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;

  try {
    await transporter.sendMail({
      from: '"James Simel from Analytics Pro" <kjsimel@gmail.com>',
      to: email,
      subject: 'Welcome to Analytics Pro! Please verify your email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Analytics Pro!</h2>
          <p>Hi there! I'm James Simel, the developer behind Analytics Pro. I'm excited to have you on board!</p>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; margin: 16px 0;">
            Verify Email
          </a>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p>Want to know more about the developer? Check out my <a href="https://jamessimel.netlify.app/" style="color: #0070f3; text-decoration: none;">portfolio</a>.</p>
          <p style="color: #666; font-size: 14px;">Analytics Pro</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
) {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL is not set');
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  try {
    await transporter.sendMail({
      from: '"Analytics Pro" <kjsimel@gmail.com>',
      to: email,
      subject: 'Reset your password - Analytics Pro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; margin: 16px 0;">
            Reset Password
          </a>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p style="color: #666; font-size: 14px;">Analytics Pro</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// Add new function for admin notifications
export async function sendAdminNotification(
  userEmail: string,
  userName: string | null
) {
  try {
    await transporter.sendMail({
      from: '"Analytics Pro Notifications" <kjsimel@gmail.com>',
      to: 'kjsimel@gmail.com',
      subject: 'New User Registration - Analytics Pro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New User Registration</h2>
          <p>A new user has registered for Analytics Pro:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Email:</strong> ${userEmail}</li>
            <li><strong>Name:</strong> ${userName || 'Not provided'}</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p style="color: #666; font-size: 14px;">Analytics Pro Admin Notification</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending admin notification:', error);
    // Don't throw error to prevent affecting user registration
  }
}