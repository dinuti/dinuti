import { IUserModel } from '../models/user-model';

export interface ILocation {
    floor: string;
    room: string;
	author: IUserModel;
}