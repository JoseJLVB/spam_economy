const nodemailer = require('nodemailer'); 

function enviar_email(destinatario, asunto, texto){

    const transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: 'vsvalcarcelbravo@gmail.com', 
            pass: "c4mp1dr21305", 
        } 
    }) 
    
    const options = { 
        from: 'vsvalcarcelbravo@gmail.com', 
        to: destinatario, 
        subject: asunto, 
        html: texto
    } 
    
    transporter.sendMail(options, function() {
        console.log('Correo enviado'); 
    });
}


module.exports = enviar_email;
