import { client, sender } from "./mailtrap-config.js"
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE  } from "./email.templates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{email}]
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification"
    })
    console.log("email sent successfully")
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    
    throw new Error(`Error sending email: ${error}`)
  }
}


export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{email}]
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "8f2d7b40-40bc-4e12-a405-d34e45ce3f7d",
      template_variables: {
        "name": username,
      }
    })
    console.log("email sent successfully: " + response)
  } catch (error) {
    console.log(`Error sending welcome email: ${error.message}`);
    
    throw new Error(`Error sending welcome email: ${error.message}`)
  }
}


export const sendLoginEmail = async (email, username) => {
  const recipient = [{email}]
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "58c8eec1-a8c0-471a-9192-675104523106",
      template_variables: {
        "test_name": username
      }
      })
  } catch (error) {
    console.log(`Error sending login email: ${error.message}`);
    throw new Error(`Error sending login email: ${error.message}`);
  }
}


export const sendForgotPasswordEmail = async (email, resetURL) => {
  const recipient = [{email}]
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "password reset"
    })
    console.log("email sent successfully: " + response)
    
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}


export const sendPasswordResetSuccessful = async (email) => {
  const recipient = [{email}]
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset password success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE
    })
    console.log("email sent successfully: " + response)
  } catch (error) {
    console.log('Error sending password reset success' + error.message)
    throw new Error('Error sending password reset success' + error.message)
  }
}