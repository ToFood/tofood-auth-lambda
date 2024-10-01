// Aqui definimos um namespace global chamado UserTypes para organizar as definições de tipos relacionadas ao usuário.
declare namespace UserTypes {
    // Interface que define os atributos de um usuário no sistema.
    export interface IUser {
        cpf: string; // CPF do usuário, que serve como identificador único.
        name: string; // Nome do usuário.
        email: string; // Email do usuário.
    }

    // Interface que define a requisição de registro/identificação de usuário.
    export interface UserIdentifyRequest {
        cpf: string; // CPF do usuário.
        name: string; // Nome do usuário.
        email: string; // Email do usuário.
        password: string; // Senha do usuário.
    }
}

// Exporta o namespace global para poder ser usado em outros arquivos do projeto.
export = UserTypes;
