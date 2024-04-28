//this is for stripe

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51O4OycSDlAtgNkuDLrtsY265RsSKMAwcWrcS7sx904wlMJU8sEV5ikHgknH7cD0TBKVwzat1JaJXJD9bq9tsDzkR006DrAndd7');
const express = require('express');
const app = express();
app.use(express.static('public'));
// const express = require('express');
// const nodemailer = require('nodemailer');

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1O4PCISDlAtgNkuDu5TEe4FE',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.redirect(303, session.url);
});
///nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'shagunmengi003@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// app.post('/send-email-to-all-students', async (req, res) => {
//   try {
//     // Fetch the list of students' email addresses from your database
//     const studentEmails = ['student1@example.com', 'student2@example.com', /* Add more emails */];

//     // Create a reusable mail options object
//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       subject: 'Subject of the email',
//       text: 'Body of the email',
//     };

//     // Send emails to all students
//     for (const email of studentEmails) {
//       mailOptions.to = email;

//       await transporter.sendMail(mailOptions);
//     }

//     res.status(200).send('Emails sent successfully to all students!');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


app.listen(4242, () => console.log('Running on port 4242'));