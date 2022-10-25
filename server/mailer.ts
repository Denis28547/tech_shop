import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendActivationMail = async (email: string, link: string) => {
  await transporter.sendMail({
    from: "TechShop",
    to: email,
    subject: "Verification",
    text: "Hello world?",
    html: `<b>To verify your account please click this link: <a href=${link}>Link<a/></b>`,
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
