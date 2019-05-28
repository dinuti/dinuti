import { ILocationModel } from 'api/models/location-model';
import { IUserModel } from '../models/user-model';

export interface ISession {
	location: ILocationModel;
	user: IUserModel;
	phone: string;
	mobile: string;
}
