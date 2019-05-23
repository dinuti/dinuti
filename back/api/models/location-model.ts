import { ILocation } from '../interfaces/location-interface';
import { Schema, Model, model, Document } from 'mongoose';
import { IUserModel } from './user-model';

export interface ILocationModel extends ILocation, Document {
	formatAsLocationJSON(user);
}

const LocationSchema = new Schema({
	desc: { type: String }
}, { timestamps: true });

LocationSchema.methods.formatAsLocationJSON = function (user: IUserModel) {

	return {
		desc: this.desc,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};

};

export const Location: Model<ILocationModel> = model<ILocationModel>('Location', LocationSchema);
