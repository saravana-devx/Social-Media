import { createTransport, Transporter } from "nodemailer";
import dotenv from "dotenv";
import { ApiError } from "../apiResponseHandler/apiError";
import { HTTP_STATUS } from "../constants";

dotenv.config();

const mailSender = async (
  email: string,
  subject: string,
  html: string
): Promise<any> => {
  try {
    const transporter: Transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false, // TLS will upgrade
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { rejectUnauthorized: false }, // Important for production SMTP providers
    });

    // verify connection before sending
    await transporter.verify();

    const mailOptions = {
      from: `"Social Media Platform" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error("Email Sending Error:", error);

    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Failed to send email. Please try again later."
    );
  }
};

export default mailSender;
