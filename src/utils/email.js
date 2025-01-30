import SibApiV3Sdk from 'sib-api-v3-sdk';

const sendDynamicEmail = async (toEmail, subject, htmlContent) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY; // Replace with your API key

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // Create the email object
  const sendSmtpEmail = {
    to: [{ email: toEmail }], // Recipient's email address
    sender: { name: 'Gaurav Thawait', email: 'iamgauravthawait@gmail.com' }, // Your verified sender details
    subject: subject, // Email subject
    htmlContent: htmlContent, // Email HTML content
  };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error while sending email:', error);
  }
};

export default sendDynamicEmail;
