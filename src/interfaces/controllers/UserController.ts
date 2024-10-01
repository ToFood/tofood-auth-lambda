import { CognitoAuthService } from '../../infrastructure/services/CognitoAuthService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { RegisterUser } from '../../application/use-cases/IdentifyUser';
import connectDB from '../../infrastructure/database/db';

// Controlador que lida com a identificação de usuário
export const IdentifyUserController = async (event: any) => {
    await connectDB(); // Conecta ao banco de dados

    // Extrai os parâmetros da requisição
    const { cpf, name, email, password } = JSON.parse(event.body);
    const userRepository = new UserRepository(); // Instancia o repositório do usuário
    const authService = new CognitoAuthService(); // Instancia o serviço de autenticação

    const registerUser = new RegisterUser(userRepository, authService); // Cria a instância do caso de uso de registro

    try {
        // Executa o registro do usuário e envia resposta de sucesso
        const message = await registerUser.execute({ cpf, name, email, password });
        return {
            statusCode: 201,
            body: JSON.stringify({ message }),
        };
    } catch (error: unknown) {
        // Garante que o error seja tratado como um objeto Error
        if (error instanceof Error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message || 'Internal server error' }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Unknown error occurred' }),
            };
        }
    }
};
