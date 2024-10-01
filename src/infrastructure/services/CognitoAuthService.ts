import { IAuthService } from '../../core/interfaces/IAuthService';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configura o cliente Cognito da AWS
const cognito = new AWS.CognitoIdentityServiceProvider();

export class CognitoAuthService implements IAuthService {
    // Método para registrar um novo usuário no Cognito
    async signUp(cpf: string, email: string, password: string): Promise<string> {
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID as string, // ID do cliente do Cognito
            Username: cpf, // Utiliza o CPF como identificador de usuário
            Password: password,
            UserAttributes: [
                { Name: 'email', Value: email }, // Atributo de email para o Cognito
            ],
        };

        await cognito.signUp(params).promise(); // Faz a chamada para registrar o usuário no Cognito
        return 'User registered successfully'; // Retorna uma mensagem de sucesso
    }

    // Método para autenticar um usuário utilizando CPF e senha
    async login(cpf: string, password: string): Promise<string> {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH', // Define o fluxo de autenticação
            ClientId: process.env.COGNITO_CLIENT_ID as string, // ID do cliente do Cognito
            AuthParameters: {
                USERNAME: cpf, // Identifica o usuário pelo CPF
                PASSWORD: password, // Senha do usuário
            },
        };

        const response = await cognito.initiateAuth(params).promise(); // Faz a chamada para autenticar o usuário
        return response.AuthenticationResult?.AccessToken || ''; // Retorna o token de acesso
    }
}
