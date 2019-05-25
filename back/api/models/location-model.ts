import { ILocation } from '../interfaces/location-interface';
import { Schema, Model, model, Document } from 'mongoose';

export interface ILocationModel extends ILocation, Document {
	formatAsLocationJSON();
}

const LocationSchema = new Schema({
	desc: { type: String }
}, { timestamps: true });

LocationSchema.methods.formatAsLocationJSON = function () {
	return {
		desc: this.desc
	};
};

export const Location: Model<ILocationModel> = model<ILocationModel>('Location', LocationSchema);
