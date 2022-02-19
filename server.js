const express = require('express');
const enviar_email = require('./email.js');
const app = express();
const axios = require('axios');
const uuid = require('uuid');
const {v4 : uuidv4} = require('uuid')
const fs = require('fs');


app.use(express.static('static'))

app.get('/email', async (req, res) => {

    let emailContent = '';

    const { correos, asunto, contenido } = req.query;

    emailContent += contenido + '\n\n';
    const divisa = await (await axios.get(`https://mindicador.cl/api`)).data;
    const enviar = ['dolar', 'euro', 'uf', 'utm'];

    enviar.forEach((indicador) => {
    emailContent += `El valor del(a) ${divisa[indicador].nombre} para hoy es: ${divisa[indicador].valor} pesos chilenos. \n\n`;
    });

    fs.writeFile(`correos/,${uuidv4()}.txt`,emailContent.replaceAll('<p>', '').replaceAll('</p>', ''),'utf-8',function () {});

    
    console.log(emailContent);

    enviar_email(correos, asunto, emailContent)

    res.send('Email enviado')
})


app.listen(3000, () => {
    console.log('servidor ejecutando');
})