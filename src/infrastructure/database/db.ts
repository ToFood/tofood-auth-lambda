import mongoose from "mongoose";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Desestruturação das variáveis de ambiente
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Criação da URI de conexão ao MongoDB usando variáveis de ambiente
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// Função para conectar ao MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri); // Realiza a conexão ao banco de dados
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Sai do processo com erro
    }
};

export default connectDB;
