/* eslint-disable no-console */
//SendGrid (Của Twilio – phổ biến)
import { env } from '~/config/environment'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(env.SG_KEY)

const sendSGMail = async ({
  recipient,
  sender,
  subject,
  html,
  text,
  attachments
}) => {
  try {
    const from = sender || 'contact@zenya.com'

    const msg = {
      to: recipient, // email of recipient
      from: from, // this will be our verified sender
      subject: subject,
      html: html,
      text: text,
      attachments: attachments
    }

    return sgMail.send(msg)

  } catch (error) {
    console.log(error)
  }
}


export const sendEmail = async ( args ) => {
  // ẩn việc gửi mail trong môi trường dev
  if ( env.NODE_ENV === 'development') {
    return new Promise.resolve()
  } else {
    return sendSGMail(args)
  }
}
