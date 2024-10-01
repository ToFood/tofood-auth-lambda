// Definição da entidade User que representa um usuário no sistema
export class User {
    constructor(
        public cpf: string, // CPF do usuário, utilizado como identificador único
        public name: string, // Nome do usuário
        public email: string // Email do usuário
    ) { }
}
