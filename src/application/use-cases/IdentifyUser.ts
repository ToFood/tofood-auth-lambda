import { IUserRepository } from '../../core/interfaces/IUserRepository';

// Interface que define a requisição de identificação do usuário
export interface IdentifyUserRequest {
    cpf: string; // CPF do usuário para identificação
}

// Interface que define a resposta de identificação do usuário
export interface IdentifyUserResponse {
    message: string; // Mensagem indicando o resultado da verificação
    statusCode: number; // Código HTTP adequado
}

// Caso de uso para identificar/verificar um usuário existente
export class IdentifyUser {
    constructor(
        private userRepository: IUserRepository // Repositório para interagir com o banco de dados
    ) { }

    // Método principal do caso de uso que realiza a identificação do usuário
    async execute(request: IdentifyUserRequest): Promise<IdentifyUserResponse> {
        // Busca o usuário no banco de dados utilizando o CPF
        const existingUser = await this.userRepository.findByCPF(request.cpf);

        // Retorna a resposta adequada de acordo com a presença do usuário no banco
        if (existingUser) {
            return {
                message: 'User found',
                statusCode: 200
            };
        } else {
            return {
                message: 'User not found',
                statusCode: 404
            };
        }
    }
}

export default IdentifyUser;
