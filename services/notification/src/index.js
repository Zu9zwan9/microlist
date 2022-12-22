const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const doc = require("nodemailer/lib/mailer/mail-message");

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL
    })
});
const todosRef = admin.firestore().collection('todos');
const query = todosRef
    .where('completed', '==', false)
    .where('createdAt', '>=', new Date(Date.now() - 30 * 60 * 1000));
query.get().then(snapshot => {
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
});
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'forlucky.luci0us@gmail.com',
        pass: '6R5-9Sn-mJm-Cxh'
    }
});
let mailOptions = {
    from: '"Task Manager" <forlucky.luci0us@gmail.com>',
    to: 'maksym.bardakh@gmail.com',
    subject: 'Incomplete task',
    text: `You have an incomplete task with the following details:
  Title: ${doc.data().title}
  Description: ${doc.data().description}`
};
