import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface para o documento User no MongoDB
export interface IUser extends Document {
    name: string;
    cpf: string;
    email: string;
}

// Schema Mongoose para a coleção de usuários
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true }, // Nome do usuário
    cpf: { type: String, required: true, unique: true }, // CPF do usuário, único
    email: { type: String, required: false, unique: true }, // Email do usuário, pode ser opcional
});

// Modelo Mongoose para a coleção de usuários
const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
