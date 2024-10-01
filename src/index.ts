import express from 'express';
import dotenv from 'dotenv';
import UserController from './interfaces/controllers/UserController';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Express
const app = express();

// Configura o Express para entender JSON
app.use(express.json());

// Define a porta a partir da variável de ambiente ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Define uma rota GET para identificação de usuário pelo CPF
app.get('/identify/:cpf', UserController.identifyUserByCPF);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
