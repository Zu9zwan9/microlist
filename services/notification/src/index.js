const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
    to: 'bardakh.maksym@lll.kpi.ua.com',
    from: 'maksym.bardakh@gmail.com', // Use the email address or domain you verified above
    subject: 'Notification',
    text: 'don\'t forget to do the task',
    html: '<strong>don\'t forget to do the task</strong>',
}
//ES6
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
