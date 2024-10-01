import connectDB from './infrastructure/database/db';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Função principal para iniciar o servidor
const startServer = async () => {
    try {
        await connectDB(); // Conecta ao banco de dados
        console.log('Server running in development mode...');
        // Aqui você pode adicionar mais lógica para inicializar outros serviços, 
        // como endpoints REST, etc.
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
