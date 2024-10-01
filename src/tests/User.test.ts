import { IdentifyUserUseCase } from "../application/use_cases/IdentifyUserUseCase";
import { IUserRepository } from "../core/interfaces/IUserRepository";
import { User } from "../core/entities/User";
import { beforeEach, describe, it, expect } from "@jest/globals";
import jwt from 'jsonwebtoken'; // Importa o JWT para verificar tokens

// Mock do repositório do usuário
class MockUserRepository implements IUserRepository {
    private users: User[] = [];

    async save(user: User) {
        this.users.push(user);
        return user;
    }

    async findByCPF(cpf: string) {
        return this.users.find(user => user.cpf === cpf) || null;
    }
}

describe("IdentifyUser Use Case", () => {
    let userRepository: IUserRepository;
    let identifyUserUseCase: IdentifyUserUseCase;

    beforeEach(() => {
        userRepository = new MockUserRepository();
        identifyUserUseCase = new IdentifyUserUseCase(userRepository);
    });

    /**
     * Testes para [IdentifyUser]
     */
    describe("IdentifyUser", () => {
        it("deve retornar que o usuário foi encontrado pelo CPF, junto com um token", async () => {
            // Dados do usuário a ser registrado no mock repository
            const userRequest = new User("12345678901", "João da Silva", "bob@example.com");

            // Salvando o usuário no mock repository
            await userRepository.save(userRequest);

            // Executa o caso de uso de identificação
            const result = await identifyUserUseCase.execute({ cpf: userRequest.cpf });

            // Valida que o usuário foi encontrado
            expect(result.statusCode).toBe(200);
            expect(result.message).toBe("Cliente Identificado"); // Alterado para "Cliente Identificado"
            expect(result.token).toBeDefined(); // Valida que o token foi gerado
            expect(typeof result.token).toBe("string"); // Verifica se o token é uma string

            // Opcional: verificar se o token é válido usando a chave secreta
            const decoded = jwt.verify(result.token as string, process.env.JWT_SECRET || 'defaultsecret');
            expect(decoded).toHaveProperty("cpf", userRequest.cpf);
        });

        it("deve retornar que o usuário não foi encontrado pelo CPF", async () => {
            // Executa o caso de uso de identificação com um CPF inexistente
            const result = await identifyUserUseCase.execute({ cpf: "00000000000" });

            // Valida que o usuário não foi encontrado
            expect(result.statusCode).toBe(404);
            expect(result.message).toBe("Cliente não localizado"); // Alterado para "Cliente não localizado"
        });

        it("deve lançar um erro se o CPF não for fornecido", async () => {
            // Verifica se o erro é lançado quando um CPF vazio é passado
            await expect(identifyUserUseCase.execute({ cpf: "" }))
                .rejects
                .toThrow("CPF is required");
        });
    });
});
