import { IUserRepository } from '../../core/interfaces/IUserRepository';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Biblioteca padrão para gerar valores aleatórios

// Interface que define a requisição de identificação do usuário
export interface IdentifyUserUseCaseRequest {
    cpf: string; // CPF do usuário para identificação
}

// Interface que define a resposta de identificação do usuário
export interface IdentifyUserUseCaseResponse {
    message: string; // Mensagem indicando o resultado da verificação
    statusCode: number; // Código HTTP adequado
    token?: string; // Token de autenticação (se o usuário for encontrado)
}

// Caso de uso para identificar/verificar um usuário existente
export class IdentifyUserUseCase {
    constructor(
        private userRepository: IUserRepository // Repositório para interagir com o banco de dados
    ) { }

    // Método principal do caso de uso que realiza a identificação do usuário
    async execute(request: IdentifyUserUseCaseRequest): Promise<IdentifyUserUseCaseResponse> {
        if (!request.cpf) {
            throw new Error("CPF is required");
        }

        // Busca o usuário no banco de dados utilizando o CPF
        const existingUser = await this.userRepository.findByCPF(request.cpf);

        // Retorna a resposta adequada de acordo com a presença do usuário no banco
        if (existingUser) {
            // Geração do número aleatório e salt para incluir no payload do JWT
            const randomNumber = Math.floor(Math.random() * 1000000); // Gera um número aleatório
            const salt = crypto.randomBytes(16).toString('hex'); // Gera um salt aleatório

            // Geração do token JWT
            const token = jwt.sign(
                {
                    cpf: existingUser.cpf,
                    name: existingUser.name,
                    random: randomNumber,  // Inclui o número aleatório no payload
                    salt: salt             // Inclui o salt no payload
                },
                process.env.JWT_SECRET || 'defaultsecret',
                { expiresIn: '1h' } // Token válido por 1 hora
            );

            return {
                message: 'Cliente Identificado',
                statusCode: 200,
                token: token // Adiciona o token de autenticação na resposta
            };
        } else {
            return {
                message: 'Cliente não localizado',
                statusCode: 404
            };
        }
    }
}

export default IdentifyUserUseCase;
