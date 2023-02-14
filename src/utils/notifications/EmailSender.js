import { createTransport } from "nodemailer";
import logger from "../loggers/Log4jsLogger.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

// Generacion de un transport
const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const gmailOptions = (emailsubject, htmlTemplate) => {
  // Opciones de Gmail, retorna los datos necesarios para general el envio
  return {
    from: process.env.GMAIL_ACCOUNT,
    to: [], // Ingrese un GMAIL para enviar un mensaje
    subject: emailsubject,
    html: htmlTemplate,
  };
};

export async function sendGmail(subject, htmlTemplate) {
  // Envio de gmail
  try {
    const mailOptions = gmailOptions(subject, htmlTemplate);

    await transporter.sendMail(mailOptions);
    logger.info("Email enviado");
  } catch (error) {
    logger.error(error);
  }
}
