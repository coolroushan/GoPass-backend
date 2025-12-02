const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  const { name, contact, email, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
// checking for empty fields
  try {
    // Configure Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email, 
      to: 'roushankumarcool@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Message Received via GoPass Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${contact || 'Not provided'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0b1f3b;">
          ${message}
        </blockquote>
      `
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ msg: 'Email sent successfully' });

  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ msg: 'Server Error: Failed to process request' });
  }
};

module.exports = { sendContactEmail };