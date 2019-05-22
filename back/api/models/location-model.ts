import { ILocation } from '../interfaces/location-interface';
import { Schema, Model, model, Document } from 'mongoose';
import { IUserModel } from './user-model';

export interface ILocationModel extends ILocation, Document {
	formatAsLocationJSON(user);
}

const LocationSchema = new Schema({
	floor: { type: String },
	room: { type: String },
	phone: { type: String, required: [true, 'can\'t be blank'] },
	mobile: { type: String, required: [true, 'can\'t be blank'] },
	description: { type: String },
	author: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

LocationSchema.methods.formatAsLocationJSON = function (user: IUserModel) {
	return {
		floor: this.floor,
		room: this.room,
		phone: this.phone,
		mobile: this.mobile,
		description: this.description,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
		author: this.author.formatAsProfileJSON(user)
	};

};

export const Location: Model<ILocationModel> = model<ILocationModel>('Location', LocationSchema);
