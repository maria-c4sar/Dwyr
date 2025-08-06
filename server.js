import express from "express";
import fs from 'fs';

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/peso.html');
});

app.post('/resul', (req, res) => {

    let {nome, altura, peso} = req.body;
    altura = parseFloat(altura / 100);
    let calc = (peso / (altura * altura)).toFixed(2);

    let classi = '';

    if(calc < 16){
        classi = `Baixo peso (Grau I)`
    }else if(calc > 16 && calc < 16.99){
        classi = `Baixo peso (Grau II)`
    }else if(calc > 17 && calc < 18.49){
        classi = `Baixo peso (Grau III)`
    }else if(calc > 18.50 && calc < 24.99){
        classi = `Peso Adequado`
    }else if(calc > 25 && calc < 29.99){
        classi = `Sobrepeso`
    }else if(calc > 30 && calc < 34.99){
        classi = `Obesidade (Grau I)`
    }else if(calc > 35 && calc < 39.99){
        classi = `Obesidade (Grau II)`
    }else{
        classi = `Obesidade (Grau III)`
    }

    fs.readFile(process.cwd() + '/resultado.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro interno do servidor');
            return;
        }

        let htmlContent = data
            .replace('{{nome}}', nome)
            .replace('{{calc}}', calc)
            .replace('{{classi}}', classi);
        
        res.send(htmlContent);
    });
});

app.listen (PORT,() => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
});