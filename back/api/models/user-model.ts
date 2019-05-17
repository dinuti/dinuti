
import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user-interface';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../utilities/authentication';
import * as crypto from 'crypto';


export interface IUserModel extends IUser, Document {
	token?: string;
	generateJWT(): string;
	formatAsUserJSON();
	setPassword(password): void;
	passwordIsValid(password): boolean;
	formatAsProfileJSON(user);
}

const UserSchema = new Schema({
	username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"],
		match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
	email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
	hash: String,
	salt: String
}, {timestamps: true});


UserSchema.methods.generateJWT = function(): string {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		username: this.username,
		exp: exp.getTime() / 1000
	}, jwtSecret);
};


UserSchema.methods.formatAsUserJSON = function() {
	return {
		username: this.username,
		email: this.email,
		token: this.generateJWT(),
	};
};


UserSchema.methods.setPassword = function(password: string): void {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};


UserSchema.methods.passwordIsValid = function(password: string): boolean {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return hash === this.hash;
};


UserSchema.methods.formatAsProfileJSON = function(user: IUserModel) {
	return {
		username: this.username
	};
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
