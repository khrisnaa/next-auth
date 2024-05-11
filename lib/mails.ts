import { sendMail } from '@/actions/send-mail';

const domain = process.env.PUBLIC_APP_URL;
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const subject = `Verify your email`;
  const html = `<div style="text-align: center;">
                <p style="font-weight:bold;">Welcome to Auth!</p>
                <p>Please confirm your email address:</p>
                <a href="${confirmLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; border-radius: 4px; padding: 10px 20px; text-decoration: none; margin-top: 15px;">Confirm Email</a>
                </div>`;

  await sendMail(email, subject, html);
};
