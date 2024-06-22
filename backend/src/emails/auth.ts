import { transporter } from '../config/nodemailer'

interface sendConfirmationEmailProps {
  email: string
  name: string
  token: string
}

export const sendConfirmationEmail = async ({
  email,
  name,
  token
}: sendConfirmationEmailProps) => {
  const emailInfo = await transporter.sendMail({
    from: 'UpTask <noreply@uptask.com>',
    to: email,
    subject: 'UpTask - Confirma tu cuenta',
    text: 'Confirma tu cuenta',
    html: `<p>Hola ${name}, comprueba tu cuenta en UpTask</p>
          <p>Tu cuenta has sido creada, ahora debes confirmarla con el siguiente enlace:
          <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta">Confirmar cuenta</a></p>
          <p>Ingresa el siguiente código: <b>${token}</b></p>
          <p>Este código expira en 15 minutos</p>
          <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
          `
  })
  console.log('Message sent: %s', emailInfo.messageId)
}

export const forgotPasswordEmail = async ({
  email,
  name,
  token
}: sendConfirmationEmailProps) => {
  const emailInfo = await transporter.sendMail({
    from: 'UpTask <noreply@uptask.com>',
    to: email,
    subject: 'UpTask - Restablecer contraseña',
    text: 'Restablecer contraseña',
    html: `<p>Hola ${name}, solicitaste restablecer tu contraseña en UpTask</p>
          <p>Haz click en el siguiente enlace para generar una nueva contraseña:
          <a href="${process.env.FRONTEND_URL}/auth/cambiar-clave">Restablecer contraseña</a></p>
          <p>Ingresa el siguiente código: <b>${token}</b></p>
          <p>Este código expira en 15 minutos</p>
          <p>Si tu no solicitaste este cambio, puedes ignorar este mensaje</p>
          `
  })
  console.log('Message sent: %s', emailInfo.messageId)
}
