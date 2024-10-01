// Interface que define os métodos do serviço de autenticação
export interface IAuthService {
    // Método para registrar um novo usuário no AWS Cognito
    signUp(cpf: string, email: string, password: string): Promise<string>;

    // Método para autenticar um usuário com CPF e senha
    login(cpf: string, password: string): Promise<string>;
}
