import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (email, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Your QRClock Account",
      html: `
        <h1>Welcome to QRClock</h1>
        <h3>Your temporary password is: <b>${password}</b></h3>
        <p>Changing to your new password is required along with 
        completing your device registration before you can log in for the first time.</p>
      `,
    });

    console.log(`Email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return info;

  } catch (error) {
    console.error(`Email failed to ${email}:`, error);
    throw error;  // Let your createEmployee function handle it
  }
};