import { ILocationModel } from 'api/models/location-model';
import { IUserModel } from '../models/user-model';

export interface ISession {
	location: ILocationModel;
    author: IUserModel;
    phone:string;
    mobile:string;
    // status:Enumerator
}

