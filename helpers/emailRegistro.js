import nodemailer from 'nodemailer'

const emailRegistro = async(datos) => {
const transporter = nodemailer.createTransport({
  host: process.env_EMAIL_HOST,
  port: process.env_EMAIL_PORT,
  auth: {
    user: process.env_EMAIL_USER,
    pass: process.env_EMAIL_PASS,
  }
});

const {email, nombre, token} = datos;

//Enviar email
const info = await transporter.sendMail({
    from: "APV -Administrador de pacientes de veterinaria",
    to: email,
    subject:'Comprueba tu cuenta en APV',
    text: 'Comprueba tu cuenta en APV',
    html:`<p>Hola: ${nombre}, Comprueba tu cuenta en el siguiente enlace: 
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar cuenta </a>
     </p>
     <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
     `
})

console.log('Mensaje enviado %s', info.messageId)
}




export default emailRegistro