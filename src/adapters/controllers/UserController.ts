import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { IdentifyUserUseCase } from '../../application/use_cases/IdentifyUserUseCase';
import { Request, Response } from 'express';

// Conecta ao banco de dados antes de qualquer operação
import connectDB from '../../infrastructure/database/db';

connectDB(); // Conecta ao MongoDB

// Controlador que lida com operações do usuário
class UserController {
    // Método para identificar um usuário pelo CPF
    static async IdentifyUserUseCaseByCPF(req: Request, res: Response): Promise<void> {
        try {
            // Extrai o CPF dos parâmetros da rota
            const { cpf } = req.params;
            if (!cpf) {
                res.status(400).json({ message: 'CPF is required' });
                return;
            }

            const userRepository = new UserRepository(); // Instancia o repositório do usuário
            const identifyUserUseCase = new IdentifyUserUseCase(userRepository); // Instancia o caso de uso de identificação do usuário

            // Executa o caso de uso de identificação
            const response = await identifyUserUseCase.execute({ cpf });

            // Retorna a resposta com base no resultado do caso de uso
            res.status(response.statusCode).json({ message: response.message });
        } catch (error: unknown) {
            // Garante que o error seja tratado como um objeto Error
            if (error instanceof Error) {
                res.status(500).json({ message: error.message || 'Internal server error' });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }
}

export default UserController;
