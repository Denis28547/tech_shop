import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendActivationMail = async () => {
  await transporter.sendMail({
    from: "TechShop",
    to: "den220903@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
};

// async sendActivationMail(to, link) {
//   await this.transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to,
//     subject: "Activation letter" + process.env.API_URL,
//     text: "",
//     html: `
//       <div>
//         <h1>To activate press link</h1>
//         <a href="${link}">${link}</a>
//       </div>
//     `,
//   });
// }

export { sendActivationMail };
