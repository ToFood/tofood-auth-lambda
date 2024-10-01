import { IUserRepository } from '../../core/interfaces/IUserRepository';
import UserModel, { IUser } from '../models/UserModel';
import { User } from '../../core/entities/User';

// Implementação do repositório de usuário utilizando Mongoose
export class UserRepository implements IUserRepository {
    // Método para buscar um usuário pelo CPF
    async findByCPF(cpf: string): Promise<User | null> {
        const user = await UserModel.findOne({ cpf }); // Busca o usuário pelo CPF no banco de dados
        return user ? new User(user.cpf, user.name, user.email) : null; // Converte o documento do Mongoose para a entidade User
    }

    // Método para salvar um novo usuário no banco de dados
    async save(user: User): Promise<User> {
        const newUser: IUser = new UserModel({
            name: user.name,
            cpf: user.cpf,
            email: user.email,
        }); // Cria uma nova instância do modelo de usuário com base nos dados da entidade

        const savedUser = await newUser.save(); // Salva o usuário no banco de dados
        return new User(savedUser.cpf, savedUser.name, savedUser.email); // Retorna o usuário salvo como entidade User
    }
}
