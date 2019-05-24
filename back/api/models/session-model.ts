import { Schema, Model, model, Document } from 'mongoose';
import { IUserModel } from './user-model';
import { ILocationModel } from './location-model';
import{ ISession } from '../interfaces/session-interface';

export interface ISessionModel extends ISession, Document {
	formatAsSessionJSON(user, location);
}

const SessionSchema = new Schema({
	location: { type: Schema.Types.ObjectId, ref: 'Location' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	phone: { type: String },
	mobile: { type : String }
}, { timestamps: true });

SessionSchema.methods.formatAsSessionJSON = function (user: IUserModel, location: ILocationModel) {

	return {
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
		location: this.location.formatAsLocation(),
		user: this.user.formatAsProfileJSON(),
		phone: this.phone,
		mobile: this.mobile
	};

};
export const Session: Model<ISessionModel> = model<ISessionModel>('Session', SessionSchema);
