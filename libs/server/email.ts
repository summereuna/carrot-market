import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  port: 587,
  //secure: true,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (userPayload: string, tokenPayload: string) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: userPayload,
    subject: "[네이버후드] 로그인 인증 이메일입니다.",
    text: `타인노출금지 [네이버후드] 인증 번호: [${tokenPayload}]`,
    html: `<b>타인노출금지 [네이버후드] 인증 번호: [${tokenPayload}]</b>`,
  };
  const result = smtpTransport.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      // console.log(res);
      return null;
    }
  });

  smtpTransport.close();

  return;
};

export default sendEmail;
