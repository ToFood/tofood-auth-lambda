import { User } from '../entities/User';

// Interface que define as operações do repositório de usuário
export interface IUserRepository {
    // Método para buscar um usuário pelo CPF
    findByCPF(cpf: string): Promise<User | null>;

    // Método para salvar um novo usuário
    save(user: User): Promise<User>;
}
