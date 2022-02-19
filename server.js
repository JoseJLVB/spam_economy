const express = require('express');
const enviar_email = require('./email.js');
const app = express();
const axios = require('axios');
const fs = require('fs');
const uuid = require('uuid');


app.use(express.static('static'))

app.get('/email', async (req, res) => {

    let emailContent = '';

    const correos = req.query.correos
    const asunto = req.query.asunto
    const contenido = req.query.contenido

    emailContent += contenido + '\n\n';
    const divisa = await (await axios.get(`https://mindicador.cl/api`)).data;
    const enviar = ['dolar', 'euro', 'uf', 'utm'];
    enviar.forEach((indicador) => {
    emailContent += `El valor del(a) ${divisa[indicador].nombre} para hoy es: ${divisa[indicador].valor} pesos chilenos. \n\n`;
    });

    console.log(emailContent);

    //enviar_email(correos, asunto, contenido)

    res.send('Email enviado')
})


app.listen(3000, () => {
    console.log('servidor ejecutando');
})