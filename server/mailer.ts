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
    html: `<center
    style="
      width: 100%;
      table-layout: fixed;
      background-color: #e7e7e7;
      padding: 70px 0;
    "
  >
    <table
      style="
        background-color: #eeeeee;
        border: 2px solid #c5c4c4;
        border-radius: 5px;
        border-spacing: 0;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        padding: 70px 0;
      "
      width="100%"
    >
      <tr>
        <td>
          <table width="100%">
            <tr>
              <td class="two-columns" style="text-align: center">
                <table
                  class="column"
                  style="
                    width: 100%;
                    max-width: 300px;
                    display: inline;
                    vertical-align: top;
                  "
                >
                  <tr>
                    <td>
                      <img src="https://i.ibb.co/N9WJJSp/logo-for-mail.png" alt="logo-for-mail" border="0">
                    </td>
                  </tr>
                </table>
                <table
                  class="column"
                  style="
                    width: 100%;
                    max-width: 300px;
                    display: inline;
                    vertical-align: top;
                  "
                >
                  <tr>
                    <td>
                      <h2 style="margin: 0; height: 28px; padding: 16px 0">
                        TechShop
                      </h2>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="text-align: center">
          <h2 style="margin: 0 0 5px 0">Verification letter</h2>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <a style="margin: 0" href=${link}>
            Please click on this text to verify your e-mail address
          </a>
        </td>
      </tr>
    </table>
  </center>`,
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
