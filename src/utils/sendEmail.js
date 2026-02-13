import nodemailer from "nodemailer";
import ApiError from "./ApiError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, text }) => {

    try {
        
        await transporter.sendMail({
            from: `"Notes App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });

    } catch (error) {
        
        console.error("Email send failed", error);
        throw new ApiError(500, "Unable to send email");
    }
};

export { sendEmail };