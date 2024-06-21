import nodemailer from 'nodemailer'

const config = () => {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  }
}

export const transporter = nodemailer.createTransport(config())
