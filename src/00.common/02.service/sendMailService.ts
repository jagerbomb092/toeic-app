import emailjs from "emailjs-com";
class SendMail {
  async sendEmail(e) {


    emailjs
      .send("service_nipvj5q", "template_d5bkiy7", e, "user_VU2W9NqGVoijsIE8yy7VY")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}

export const sendMail = new SendMail();
