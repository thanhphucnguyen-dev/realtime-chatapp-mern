
//SendGrid (Của Twilio – phổ biến)
import { env } from '~/config/environment'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(env.SG_KEY)

const sendSGMail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text
}) => {
  try {
    const from = sender || 'thanhphucnguyen54@gmail.com'

    const msg = {
      to: to, // email of recipient
      from: from, // this will be our verified sender
      subject: subject,
      html: html,
      text: text,
      attachments: attachments
    }

    return sgMail.send(msg)
    // console.log(`Email sent to ${recipient}`)

  } catch (error) {
    // console.error('Failed to send email:', error?.response?.body || error)
    throw error
  }
}


export const sendEmail = async ( args ) => {
  // ẩn việc gửi mail trong môi trường dev
  if ( env.NODE_ENV === 'production') {
    // console.log('[DEV MODE] Email sending skipped.')
    return Promise.resolve()
  }
  return sendSGMail(args)
}
