import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    watchedMovies: Schema.Types.ObjectId[];
    moviesToWatch: Schema.Types.ObjectId[];
}

export interface IUserModel extends Model<IUser> {
    createUser(username: string, email: string, password: string): Promise<IUser>;
    authenticate(email: string, password: string): Promise<IUser | null>;
}

// Exporta el esquema de usuario
export const userSchema: Schema<IUser> = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    watchedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    moviesToWatch: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

// Define métodos estáticos en el esquema de usuario
userSchema.statics.createUser = async function (username: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.create({ username, email, password: hashedPassword });
};

userSchema.statics.authenticate = async function (email: string, password: string): Promise<IUser | null> {
    const user = await this.findOne({ email });
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
};

// Exporta el modelo de usuario
export default mongoose.model<IUser, IUserModel>('User', userSchema);
