import { Schema, Model, model, Document } from 'mongoose';
import { IUserModel } from './user-model';
import { ILocationModel } from './location-model';
import{ ISession } from '../interfaces/session-interface';

export interface ISessionModel extends ISession, Document {
	formatAsSessionJSON(user: IUserModel, location: ILocationModel);
}

const SessionSchema = new Schema({
	location: { type: Schema.Types.ObjectId, ref: 'Location' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	phone: { type: String },
	mobile: { type: String },
	statut: { type: Number, default: 1 },
	lastAlive: { type: Date }
});

SessionSchema.methods.formatAsSessionJSON = function (user: IUserModel, location: ILocationModel) {
	return {
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
		user: this.user.formatAsProfileJSON(user),
		location: this.location.formatAsLocationJSON(location),
		phone: this.phone,
		mobile: this.mobile,
		lastAlive: this.lastAlive,
		statut: this.statut
	};
};

export const Session: Model<ISessionModel> = model<ISessionModel>('Session', SessionSchema);
