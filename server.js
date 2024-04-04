const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Assuming you're using Nodemailer for sending emails

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/send-email", (req, res) => {
    res.send("hello")
})

// Endpoint for handling form submissions
app.post("/send-email", (req, res) => {
  res.send("request succeeded")
  /*const { email, message } = req.body;

  // Use Nodemailer to send email
  const transporter = nodemailer.createTransport({
    // Configure your email service here (e.g., Gmail, SMTP)
    // Example configuration for Gmail:
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: "esraa.hisham@cis.asu.edu.eg", // Sender's email address
    to: process.env.EMAIL_USER, // Your email address
    subject: "New message from ESIdeas",
    text: `From: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });*/
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
