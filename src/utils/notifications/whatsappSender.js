import twilio from "twilio";

const accountSid = ""; // Se debe agregar un accountSid desde twilio
const authToken = ""; // Se debe agregar un authToken desde twilio

const client = twilio(accountSid, authToken);

const options = {
  body: "Hola este es un WSP desde el proyecto con node.js!",
  from: "whatsapp:+14155238886",
  to: "whatsapp:+5491154798659",
};

const message = await client.messages.create(options);

export default message;

// No implementado en el proyecto, funciona solamente ejecutando este archivo
