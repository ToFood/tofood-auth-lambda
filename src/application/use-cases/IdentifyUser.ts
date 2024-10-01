import { IUserRepository } from '../../core/interfaces/IUserRepository';
import { IAuthService } from '../../core/interfaces/IAuthService';
import { User } from '../../core/entities/User';

// Interface que define a requisição de registro do usuário
interface RegisterUserRequest {
    cpf: string;
    name: string;
    email: string;
    password: string;
}

// Caso de uso para registrar um novo usuário
export class RegisterUser {
    constructor(
        private userRepository: IUserRepository, // Repositório para interagir com o banco de dados
        private authService: IAuthService // Serviço de autenticação (Cognito)
    ) { }

    // Método principal do caso de uso que realiza o registro do usuário
    async execute(request: RegisterUserRequest): Promise<string> {
        // Verifica se o usuário já existe no banco de dados pelo CPF
        const existingUser = await this.userRepository.findByCPF(request.cpf);

        if (existingUser) {
            throw new Error('User already exists'); // Se o usuário já existe, lança um erro
        }

        // Cria uma nova entidade de usuário e salva no banco de dados
        const newUser = new User(request.cpf, request.name, request.email);
        await this.userRepository.save(newUser);

        // Registra o usuário no AWS Cognito
        return this.authService.signUp(request.cpf, request.email, request.password);
    }
}
