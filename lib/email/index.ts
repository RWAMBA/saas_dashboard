import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(resendApiKey || 'dummy_key');

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    throw new Error('RESEND_API_KEY is not set');
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL is not configured');
  }
  
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  console.log('Reset URL:', resetUrl);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Analytics Pro <onboarding@resend.dev>',
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
      `,
    });

    if (error) {
      console.error('Failed to send reset email:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export async function sendVerificationEmail(
  email: string,
  verificationToken: string
) {
  if (!resendApiKey) {
    console.warn('Skipping email send - RESEND_API_KEY not configured');
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL is not configured');
  }
  
  const verifyUrl = `${appUrl}/verify-email?token=${verificationToken}`;

  console.log('Verification URL:', verifyUrl);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Analytics Pro <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email - Analytics Pro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Analytics Pro!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; margin: 16px 0;">
            Verify Email
          </a>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;" />
          <p style="color: #666; font-size: 14px;">Analytics Pro</p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
} 