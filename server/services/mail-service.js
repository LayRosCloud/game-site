const nodemailer = require('nodemailer')
class MailService{

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }

        })
    }
    async sendActivationMail(to, link, login){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта',
            text: '',
            html:
                `
                <div style="justify-content: center; max-width: 1000px;  margin: 0 auto; padding: 15px; background: #e3e3e3; border-radius: 20px;">
                    <div style="max-width: 800px; display: flex; flex-direction: column; margin: 0 auto; background: #fff; border-radius: 20px; padding: 15px;">
                        <h1 style="text-align: center; font-size: 30px; font-weight: bold; margin: 0;">Leafall</h1>
                        <h3 style="text-align: center;">Активация аккаунта</h3>
                        <p style="text-align: center; font-size: 30px;">Здравствуйте, <strong>${login}</strong>!👋</p>
                        <p>Ваш почтовый адрес был указан при регистрации на сервисе  "<strong><a style="color: rgb(107, 146, 146); text-decoration: none;" href="${process.env.CLIENT_URL}">Leafall</a></strong>"</p>
                        <p>Для активации аккаунта перейдите по <a href="${link}">ссылке</a></p>
                        <p style="opacity: 0.5;"><span style="color: red;">P.S.</span> Если это были не вы, просто проигнорируйте данное письмо*</p>
                        <p style="text-align: right;">с любовью ваш <strong>Leafall</strong>❤️!</p>
                    </div>
                </div>
                `
        }, ()=>{

        })
    }
}
module.exports = new MailService();